import sequelize from "../src/modules/libraries/database.library.js";

const runMigration = async () => {
  try {
    console.log("Running migrations...");

    // 創建 schema，如果不存在
    await sequelize.query(`
      CREATE SCHEMA IF NOT EXISTS short_url;
    `);

    // 創建 urls 表格（若不存在）
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS short_url.urls (
        id SERIAL PRIMARY KEY,
        orig_url TEXT NOT NULL,
        short_code VARCHAR(7) UNIQUE NOT NULL,
        clicks INT DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP,
        deleted_at TIMESTAMP
      );
    `);
    console.log("Table 'short_url.urls' created or already exists.");

    // 創建 tracking 表格（若不存在）
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS short_url.tracking (
        id SERIAL NOT NULL,
        short_code VARCHAR(6) NOT NULL,
        ip INET NOT NULL,
        referer TEXT,
        user_agent TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id, created_at)
      ) PARTITION BY RANGE (created_at);
    `);
    console.log("Table 'short_url.tracking' created or already exists.");

    // 創建 tracking_default 表格（若不存在）
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS short_url.tracking_default PARTITION OF short_url.tracking DEFAULT;
    `);
    console.log(
      "Table 'short_url.tracking_default' created or already exists."
    );
    console.log("Migration completed");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await sequelize.close();
  }
};

await runMigration(); // 執行 migration
