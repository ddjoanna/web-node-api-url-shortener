import ShortenerService from "../services/shortener.service.js";

class RedirectOriginalUrlUseCase {
  async execute(shortCode) {
    await ShortenerService.incrementClicks(shortCode);
    return await ShortenerService.getOriginalUrl(shortCode);
  }
}

export default RedirectOriginalUrlUseCase;
