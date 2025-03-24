import QrCodeService from "../services/qrcode.service.js";

class GenerateQrCodeUsecase {
  async execute(url, options) {
    return await QrCodeService.generateQrCode(url, options);
  }
}

export default GenerateQrCodeUsecase;
