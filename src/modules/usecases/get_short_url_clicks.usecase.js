import ShortenerService from "../services/shortener.service.js";

class GetShortUrlClicksUseCase {
  async execute(shortCode) {
    return await ShortenerService.getClicks(shortCode);
  }
}

export default GetShortUrlClicksUseCase;
