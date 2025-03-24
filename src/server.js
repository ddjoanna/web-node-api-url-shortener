import express from "express";
import swaggerUi from "swagger-ui-express";
import specs from "./swagger.js";
import shortenerRoutes from "./modules/routes/shortener.route.js";
import redirectRoutes from "./modules/routes/redirect.route.js";
import qrcodeRoutes from "./modules/routes/qrcode.route.js";
import sequelize from "./config/database.js";

const app = express();
// 啟用 Swagger UI
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

// health check
app.get("/health", (req, res) => {
  res.send("OK");
});

// redirect to health check
app.get("/", (req, res) => {
  res.redirect("/health");
});

// 解析 JSON 數據
app.use(express.json());

// 短網址重定向
app.use("/", redirectRoutes);
// 短網址
app.use("/api/shortener", shortenerRoutes);
// 生成 QR Code
app.use("/api/qrcode", qrcodeRoutes);

// 全局錯誤處理中間件
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);
  res.status(err.status || 500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

sequelize
  .authenticate()
  .then(() => console.log("Database connection established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));
