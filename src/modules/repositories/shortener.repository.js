import Url from "../models/url.model.js";
import Tracking from "../models/tracking.model.js";

class ShortenerRepository {
  /**
   * 保存短網址到資料庫
   * @param {string} originalUrl - 原始網址
   * @param {string} shortCode - 短碼
   */
  static async saveUrl(originalUrl, shortCode) {
    await Url.create({
      originalUrl: originalUrl,
      shortCode: shortCode,
    });
  }

  /**
   * 根據短碼獲取原始網址
   * @param {string} shortCode - 短碼
   * @returns {string|null} 原始網址或 null
   */
  static async getUrl(shortCode) {
    const url = await Url.findOne({
      where: {
        shortCode: shortCode,
        deletedAt: null, // 篩選未刪除的記錄
      },
    });
    return url ? url.originalUrl : null;
  }

  /**
   * 增加短網址的點擊次數
   * @param {string} shortCode - 短碼
   */
  static async incrementClicks(shortCode) {
    await Url.increment("clicks", {
      by: 1,
      where: {
        shortCode: shortCode,
        deletedAt: null, // 篩選未刪除的記錄
      },
    });
    await Url.update(
      { updatedAt: new Date() },
      {
        where: {
          shortCode: shortCode,
          deletedAt: null,
        },
      }
    );
  }

  /**
   * 獲取短網址的點擊次數
   * @param {string} shortCode - 短碼
   * @returns {number|null} 點擊次數或 null
   */
  static async getClicks(shortCode) {
    const url = await Url.findOne({
      attributes: ["clicks"],
      where: {
        shortCode: shortCode,
      },
    });
    return url ? url.clicks : null;
  }

  /**
   * 記錄追蹤信息
   * @param {object} info - 追蹤信息 (shortCode, ip, referer, userAgent)
   */
  static async recordTracking(info) {
    await Tracking.create({
      shortCode: info.shortCode,
      ip: info.ip,
      referer: info.referer,
      userAgent: info.userAgent,
    });
  }

  /**
   * 刪除短網址 (標記為已刪除)
   * @param {string} shortCode - 短碼
   */
  static async deleteShortUrl(shortCode) {
    await Url.update(
      { deletedAt: new Date() },
      {
        where: {
          shortCode: shortCode,
          deletedAt: null,
        },
      }
    );
  }

  /**
   * 根據短碼獲取完整記錄
   * @param {string} shortCode - 短碼
   * @returns {object|null} 短網址記錄或 null
   */
  static async get(shortCode) {
    const url = await Url.findOne({
      where: {
        shortCode: shortCode,
      },
    });
    return url ? url.toJSON() : null;
  }
}

export default ShortenerRepository;
