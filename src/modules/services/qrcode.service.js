import QRCode from "qrcode";
import axios from "axios";
import { createCanvas, loadImage } from "canvas";

class QrCodeService {
  async generateQrCode(url, options) {
    const qrCodeDataURL = await this.generateQrCodeImage(url);

    try {
      const { logo } = options;
      if (logo) {
        return await this.addLogoToQrCode(qrCodeDataURL, logo);
      }
    } catch (error) {
      console.error("Error generating QR code:", error.message);
    }

    return qrCodeDataURL;
  }

  async generateQrCodeImage(url) {
    return await QRCode.toDataURL(url, {
      errorCorrectionLevel: "H",
      margin: 0,
      scale: 10,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });
  }

  async addLogoToQrCode(qrCodeDataURL, logoUrl) {
    const qrCodeImage = await loadImage(qrCodeDataURL);
    const logoImage = await this.fetchLogoImage(logoUrl);

    const canvas = createCanvas(qrCodeImage.width, qrCodeImage.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(qrCodeImage, 0, 0);

    const scaledLogo = this.scaleLogo(logoImage, qrCodeImage);
    const logoPosition = this.calculateLogoPosition(qrCodeImage, scaledLogo);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(
      logoPosition.x - 5,
      logoPosition.y - 5,
      scaledLogo.width + 10,
      scaledLogo.height + 10
    );

    ctx.drawImage(
      logoImage,
      logoPosition.x,
      logoPosition.y,
      scaledLogo.width,
      scaledLogo.height
    );

    return canvas.toDataURL();
  }

  async fetchLogoImage(logoUrl) {
    const response = await axios.get(logoUrl, { responseType: "arraybuffer" });
    const logoBuffer = Buffer.from(response.data);
    return loadImage(logoBuffer);
  }

  scaleLogo(logoImage, qrCodeImage) {
    const SCALE_RATIO = 0.3;
    const maxLogoSize =
      Math.min(qrCodeImage.width, qrCodeImage.height) * SCALE_RATIO;
    const logoScale = Math.min(
      maxLogoSize / logoImage.width,
      maxLogoSize / logoImage.height
    );
    return {
      width: logoImage.width * logoScale,
      height: logoImage.height * logoScale,
    };
  }

  calculateLogoPosition(qrCodeImage, scaledLogo) {
    return {
      x: (qrCodeImage.width - scaledLogo.width) / 2,
      y: (qrCodeImage.height - scaledLogo.height) / 2,
    };
  }
}

export default new QrCodeService();
