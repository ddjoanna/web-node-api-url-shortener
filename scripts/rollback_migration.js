import sequelize from "./../src/modules/libraries/database.library.js";

const rollbackMigration = async () => {
  try {
    // 執行 down() 方法的 SQL 查詢
    console.log("Rolling back migrations...");

    await sequelize.query(`
      DROP TABLE IF EXISTS short_url.tracking_default;
    `);

    await sequelize.query(`
      DROP TABLE IF EXISTS short_url.tracking;
    `);

    await sequelize.query(`
      DROP TABLE IF EXISTS short_url.urls;
    `);

    await sequelize.query(`
      DROP SCHEMA IF EXISTS short_url CASCADE;
    `);
    console.log("Rollback completed!");
  } catch (error) {
    console.error("Rollback failed:", error);
  } finally {
    await sequelize.close();
  }
};

await rollbackMigration(); // 或者執行 rollback
