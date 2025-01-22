const redisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  name: process.env.REDIS_NAME || "default",
};

export default redisConfig;
