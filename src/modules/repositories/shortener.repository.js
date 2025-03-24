import pgPool from "../../config/postgres.js";

class ShortenerRepository {
  static async saveUrl(originalUrl, shortCode) {
    const query = {
      text: "INSERT INTO short_url.urls(orig_url, short_code) VALUES($1, $2) RETURNING *",
      values: [originalUrl, shortCode],
    };
    await pgPool.query(query);
  }

  static async getUrl(shortCode) {
    const query = {
      text: "SELECT orig_url FROM short_url.urls WHERE short_code = $1 AND deleted_at IS NULL",
      values: [shortCode],
    };
    const result = await pgPool.query(query);
    return result.rows[0] ? result.rows[0].orig_url : null;
  }

  static async incrementClicks(shortCode) {
    const query = {
      text: "UPDATE short_url.urls SET clicks = clicks + 1, updated_at = now() WHERE short_code = $1 AND deleted_at IS NULL",
      values: [shortCode],
    };
    await pgPool.query(query);
  }

  static async getClicks(shortCode) {
    const query = {
      text: "SELECT clicks FROM short_url.urls WHERE short_code = $1",
      values: [shortCode],
    };
    const result = await pgPool.query(query);
    return result.rows[0] ? result.rows[0].clicks : null;
  }

  static async recordTracking(info) {
    const query = {
      text: "INSERT INTO short_url.tracking (short_code, ip, referer, user_agent) VALUES($1, $2, $3, $4) RETURNING *",
      values: [info.shortCode, info.ip, info.referer, info.userAgent],
    };
    await pgPool.query(query);
  }

  static async deleteShortUrl(shortCode) {
    const query = {
      text: "UPDATE short_url.urls SET deleted_at = now() WHERE short_code = $1",
      values: [shortCode],
    };
    await pgPool.query(query);
  }
}

export default ShortenerRepository;
