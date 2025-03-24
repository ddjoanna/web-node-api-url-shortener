import RedirectOriginalUrlUseCase from "../usecases/redirect_original_url.usecase.js";

class RedirectController {
  static async redirectOriginalUrl(req, res, next) {
    const { shortCode } = req.params;

    try {
      // 驗證短碼是否符合格式（6 位字母或數字）
      const isValidShortCode = /^[a-zA-Z0-9\-]{6}$/.test(shortCode);
      if (!isValidShortCode) {
        return res.status(404).send("Short URL not found");
      }

      const trackingInfo = {
        shortCode,
        ip: req.ip,
        referer: req.headers.referer,
        userAgent: req.headers["user-agent"],
      };

      const useCase = new RedirectOriginalUrlUseCase();
      const originalUrl = await useCase.execute(shortCode, trackingInfo);

      if (!originalUrl) {
        return res.status(404).send("Short URL not found");
      }

      res.redirect(originalUrl);
    } catch (error) {
      console.error("❌ Controller Error:", error);
      next(error); // 傳遞錯誤給全局錯誤處理器
    }
  }
}

export default RedirectController;
