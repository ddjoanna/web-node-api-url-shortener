import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export default new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    logging: false, // 禁用 SQL 日誌
    pool: {
      max: parseInt(process.env.DB_MAX_OPEN_CONN) || 10, // 最大開啟的連線數
      min: parseInt(process.env.DB_MAX_IDLE_CONN) || 0, // 最小閒置連線數
      acquire: 30000, // 獲取連線的最大等待時間（毫秒）
      idle: 10000, // 閒置連線的最大存活時間（毫秒）
    },
    define: {
      schema: "short_url", // 設定預設 schema
    },
  }
);
