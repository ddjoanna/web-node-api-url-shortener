import ShortenerService from "../services/shortener.service.js";

class GetShortUrlStatsUseCase {
  async execute(shortCode) {
    const record = await ShortenerService.get(shortCode);
    if (!record) {
      return null;
    }

    return {
      originalUrl: record.orig_url,
      totalClicks: record.clicks,
      createdAt: record.created_at,
      deletedAt: record.deleted_at,
    };
  }
}

export default GetShortUrlStatsUseCase;
