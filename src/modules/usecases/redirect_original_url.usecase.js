import ShortenerService from "../services/shortener.service.js";

class RedirectOriginalUrlUseCase {
  async execute(shortCode, trackingInfo) {
    const originalUrl = await ShortenerService.getOriginalUrl(shortCode);
    if (!originalUrl) {
      return null;
    }

    await ShortenerService.recordTracking(trackingInfo);
    await ShortenerService.incrementClicks(shortCode);
    return originalUrl;
  }
}

export default RedirectOriginalUrlUseCase;
