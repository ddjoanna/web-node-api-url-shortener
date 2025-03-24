import CreateShortUrlUseCase from "../usecases/create_short_url.usecase.js";
import GetOriginalUrlUseCase from "../usecases/get_original_url.usecase.js";
import GetShortUrlClicksUseCase from "../usecases/get_short_url_clicks.usecase.js";
import DeleteShortUrlUseCase from "../usecases/delete_short_url.usecase.js";
import GetShortUrlStatsUseCase from "../usecases/get_short_url_stats.usecase.js";
import GetTrackingRecordsUseCase from "../usecases/get_tracking_records.usecase.js";
import { isValidDate } from "../utils/validation.util.js";

class ShortenerController {
  static async createShortUrl(req, res, next) {
    try {
      const { url } = req.body;
      if (!url) return res.status(400).json({ error: "URL is required" });

      const useCase = new CreateShortUrlUseCase();
      const shortCode = await useCase.execute(url);
      res
        .status(201)
        .json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
    } catch (error) {
      console.error("❌ Controller Error:", error);
      next(error); // 傳遞錯誤給全局錯誤處理器
    }
  }

  static async getOriginalUrl(req, res, next) {
    try {
      const { shortCode } = req.params;
      const useCase = new GetOriginalUrlUseCase();
      const originalUrl = await useCase.execute(shortCode);

      if (!originalUrl) return res.status(404).json({ error: "URL not found" });

      res.status(201).json({ originalUrl: originalUrl });
    } catch (error) {
      console.error("❌ Controller Error:", error);
      next(error); // 傳遞錯誤給全局錯誤處理器
    }
  }

  static async getClicks(req, res, next) {
    try {
      const { shortCode } = req.params;
      const useCase = new GetShortUrlClicksUseCase();
      const clicks = await useCase.execute(shortCode);

      if (!clicks) return res.status(404).json({ error: "URL not found" });

      res.status(201).json({ clicks: clicks });
    } catch (error) {
      console.error("❌ Controller Error:", error);
      next(error); // 傳遞錯誤給全局錯誤處理器
    }
  }

  static async deleteShortUrl(req, res, next) {
    try {
      const { shortCode } = req.params;
      const useCase = new DeleteShortUrlUseCase();
      await useCase.execute(shortCode);

      res.status(200).json({ message: "Short URL deleted successfully" });
    } catch (error) {
      console.error("❌ Controller Error:", error);
      next(error); // 傳遞錯誤給全局錯誤處理器
    }
  }

  static async getShortUrlStats(req, res, next) {
    try {
      const { shortCode } = req.params;
      const useCase = new GetShortUrlStatsUseCase();
      const stats = await useCase.execute(shortCode);

      if (!stats) return res.status(404).json({ error: "URL not found" });

      res.status(201).json(stats);
    } catch (error) {
      console.error("❌ Controller Error:", error);
      next(error); // 傳遞錯誤給全局錯誤處理器
    }
  }

  static async getTrackingRecords(req, res, next) {
    try {
      const { shortCode } = req.params;
      const { startDate, endDate, page = 1, limit = 10 } = req.query;

      if (!shortCode || !startDate || !endDate) {
        return res.status(400).json({ error: "Missing parameters" });
      }

      if (startDate && !isValidDate(startDate)) {
        return res.status(400).json({ error: "Invalid start date format" });
      }

      if (endDate && !isValidDate(endDate)) {
        return res.status(400).json({ error: "Invalid end date format" });
      }

      const useCase = new GetTrackingRecordsUseCase();
      const paginationResult = await useCase.execute(
        shortCode,
        startDate,
        endDate,
        parseInt(page),
        parseInt(limit)
      );

      res.status(200).json(paginationResult);
    } catch (error) {
      console.error("❌ Controller Error:", error);
      next(error); // 傳遞錯誤給全局錯誤處理器
    }
  }
}

export default ShortenerController;
