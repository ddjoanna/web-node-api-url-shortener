# web-node-api-url-shortener

## 專案目的

    提供短網址產生器API服務

## 專案目標

    短網址產生器以及成效追蹤功能

## 啟動專案步驟

1. clone 專案
2. 安裝 docker 和 docker-compose
3. 設定 `.env` 檔案(可參考 `.env.example`)
4. 執行 `make up` 啟動專案
5. 執行 `make migrate` 建立資料表
6. 執行 `make run` 啟動 server
7. 參考 API Documentation 測試應用
8. 執行 `make down` 關閉服務

## API Documentation

1. [Swagger JSON](swagger.json)
2. http://localhost:3000/swagger/

## Note

1. 由於預期資料量較大，系統採用資料分區（Partitioning）設計，以提升查詢效能與資料管理效率。
2. 資料分區的自動化建立與維護可考慮使用 PostgreSQL 擴充套件 `pg_partman` 另外可搭配 `pg_cron` 定期執行分區建立或維護作業。
