import { customAlphabet } from "nanoid";
import redisClient from "../../config/redis.js";
import ShortenerRepository from "../repositories/shortener.repository.js";

class ShortenerService {
  static async createShortUrl(originalUrl) {
    const shortCode = this.generateShortCode();
    await ShortenerRepository.saveUrl(originalUrl, shortCode);
    await this.cacheShortUrl(shortCode, originalUrl);

    return shortCode;
  }

  static generateShortCode() {
    const nanoid = customAlphabet(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-",
      6
    );
    return nanoid();
  }

  static async getOriginalUrl(shortCode) {
    const cacheKey = this.getCacheKey(shortCode);

    // 從 Redis 緩存中查詢
    const cachedData = await this.getCachedData(cacheKey);
    if (cachedData) {
      await this.refreshCacheTTL(cacheKey, cachedData.originalUrl);
      return cachedData.originalUrl;
    }

    // 若 Redis 中無資料，查詢資料庫
    const originalUrl = await ShortenerRepository.getUrl(shortCode);
    if (!originalUrl) return null;

    // 將資料寫回 Redis 緩存
    await this.cacheShortUrl(shortCode, originalUrl);

    return originalUrl;
  }

  static async incrementClicks(shortCode) {
    await ShortenerRepository.incrementClicks(shortCode);
  }

  static async recordTracking(info) {
    await ShortenerRepository.recordTracking(info);
  }

  static async cacheShortUrl(shortCode, originalUrl) {
    const cacheKey = this.getCacheKey(shortCode);
    const ttlInSeconds = 24 * 60 * 60; // TTL: 1 天

    await redisClient.setEx(
      cacheKey,
      ttlInSeconds,
      JSON.stringify({ originalUrl })
    );
  }

  static async getCachedData(cacheKey) {
    const cachedData = await redisClient.get(cacheKey);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  static async refreshCacheTTL(cacheKey, originalUrl) {
    const ttlInSeconds = 24 * 60 * 60; // TTL: 1 天

    await redisClient.setEx(
      cacheKey,
      ttlInSeconds,
      JSON.stringify({ originalUrl })
    );
  }

  static getCacheKey(shortCode) {
    return `short_code:${shortCode}`;
  }

  static async getClicks(shortCode) {
    return await ShortenerRepository.getClicks(shortCode);
  }

  static async deleteShortUrl(shortCode) {
    await ShortenerRepository.deleteShortUrl(shortCode);
    await this.clearShortUrlCache(shortCode);
  }

  static async clearShortUrlCache(shortCode) {
    const cacheKey = this.getCacheKey(shortCode);
    console.log("🚀 Remove Short URL from Cache:", cacheKey);
    await redisClient.del(cacheKey);
  }
}

export default ShortenerService;
