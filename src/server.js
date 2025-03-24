import express from "express";
import swaggerUi from "swagger-ui-express";
import specs from "./swagger.js";
import shortenerRoutes from "./modules/routes/shortener.route.js";
import redirectRoutes from "./modules/routes/redirect.route.js";

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

// API 路由
app.use("/api/shortener", shortenerRoutes);
// 短網址重定向路由
app.use("/", redirectRoutes);

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
