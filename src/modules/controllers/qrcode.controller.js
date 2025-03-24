import GenerateQrCodeUsecase from "../usecases/generate_qrcode.usecase.js";

class QrCodeController {
  async generateQrCode(req, res) {
    try {
      const url = req.body.url;
      if (!url) return res.status(400).json({ error: "URL is required" });

      const logo = req.body.logo;
      const options = {
        logo,
      };

      const useCase = new GenerateQrCodeUsecase();
      const qrCode = await useCase.execute(url, options);
      res.status(201).send(qrCode);
    } catch (error) {
      console.error("❌ Controller Error:", error);
      res.status(500).send("Error generating QR code");
    }
  }
}

export default new QrCodeController();
