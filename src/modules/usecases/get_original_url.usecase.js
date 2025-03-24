import ShortenerService from "../services/shortener.service.js";

class GetOriginalUrlUseCase {
  async execute(shortCode) {
    return await ShortenerService.getOriginalUrl(shortCode);
  }
}

export default GetOriginalUrlUseCase;
