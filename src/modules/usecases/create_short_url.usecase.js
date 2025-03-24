import ShortenerService from "../services/shortener.service.js";

class CreateShortUrlUseCase {
  async execute(url) {
    return await ShortenerService.createShortUrl(url);
  }
}

export default CreateShortUrlUseCase;
