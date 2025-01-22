import { createClient, RedisClientType } from "redis";
import config from "@/configs/database/config.redis";

export class RedisClient {
  private static instance: RedisClient | null = null;
  private client: RedisClientType;

  private constructor() {
    const { host, port } = config;
    const redisURL = `redis://${host}:${port}`;

    if (!redisURL) {
      throw new Error("Redis URL is not defined in the configuration.");
    }

    this.client = createClient({ url: redisURL });
    this.client.on("error", (e: Error) => {
      console.error("Failed to create the Redis client:", e);
    });
  }

  public static async getInstance(): Promise<RedisClient> {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
      await RedisClient.instance.connect();
    }
    return RedisClient.instance;
  }

  private async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log("Connected to Redis successfully!");
    } catch (e) {
      console.error("Connection to Redis failed:", e);
      throw e;
    }
  }

  public getClient(): RedisClientType {
    return this.client;
  }
}
