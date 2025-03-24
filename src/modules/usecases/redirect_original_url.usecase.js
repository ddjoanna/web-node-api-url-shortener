import ShortenerService from "../services/shortener.service.js";

class RedirectOriginalUrlUseCase {
  async execute(shortCode, trackingInfo) {
    await ShortenerService.recordTracking(trackingInfo);
    await ShortenerService.incrementClicks(shortCode);
    return await ShortenerService.getOriginalUrl(shortCode);
  }
}

export default RedirectOriginalUrlUseCase;
