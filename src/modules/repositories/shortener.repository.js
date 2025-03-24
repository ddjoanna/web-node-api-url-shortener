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
      text: "SELECT orig_url FROM short_url.urls WHERE short_code = $1",
      values: [shortCode],
    };
    const result = await pgPool.query(query);
    return result.rows[0] ? result.rows[0].orig_url : null;
  }

  static async incrementClicks(shortCode) {
    const query = {
      text: "UPDATE short_url.urls SET clicks = clicks + 1 WHERE short_code = $1",
      values: [shortCode],
    };
    await pgPool.query(query);
  }
}

export default ShortenerRepository;
