import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

class RedisClient {
  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL,
    });

    this.client.on("error", (err) => {
      console.error("❌ Redis Error:", err);
    });

    this.connected = false;
  }

  async connect() {
    if (!this.connected) {
      await this.client.connect();
      this.connected = true;
      console.log("✅ Redis connected");
    }
  }

  async set(key, value, expireInSec = null) {
    await this.connect();
    const stringValue = JSON.stringify(value);
    if (expireInSec) {
      return await this.client.setEx(key, expireInSec, stringValue);
    }
    return await this.client.set(key, stringValue);
  }

  async setEx(key, value, expireInSec) {
    await this.connect();
    const stringValue = JSON.stringify(value);
    return await this.client.setEx(key, expireInSec, stringValue);
  }

  async get(key) {
    await this.connect();
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async del(key) {
    await this.connect();
    return await this.client.del(key);
  }

  async exists(key) {
    await this.connect();
    return await this.client.exists(key);
  }

  async ttl(key) {
    await this.connect();
    return await this.client.ttl(key);
  }

  async flushAll() {
    await this.connect();
    return await this.client.flushAll();
  }

  async disconnect() {
    if (this.connected) {
      await this.client.disconnect();
      this.connected = false;
    }
  }
}

export default new RedisClient();
