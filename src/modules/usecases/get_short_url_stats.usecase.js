import ShortenerService from "../services/shortener.service.js";

class GetShortUrlStatsUseCase {
  async execute(shortCode) {
    const record = await ShortenerService.get(shortCode);
    if (!record) {
      return null;
    }

    return {
      originalUrl: record.originalUrl,
      totalClicks: record.clicks,
      createdAt: record.createdAt,
      deletedAt: record.deletedAt,
    };
  }
}

export default GetShortUrlStatsUseCase;
