import ShortenerService from "../services/shortener.service.js";

class DeleteShortUrlUseCase {
  async execute(shortCode) {
    await ShortenerService.deleteShortUrl(shortCode);
  }
}

export default DeleteShortUrlUseCase;
