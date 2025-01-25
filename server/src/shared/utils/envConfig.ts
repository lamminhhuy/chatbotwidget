import dotenv from "dotenv";
import { cleanEnv, host, num, port, str } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: "dev",
    choices: ["dev", "pro", "test"],
  }),
  REDIS_URL: str({
    default: "redis://chatbot-redis:6379", 
  }),
  GOOGLE_GEMINI_API_KEY: str(),
  HOST: host({
    default: "localhost",
  }),
  PORT: port({
    default: 5001,
  }),
  CORS_ORIGIN: str({
    default: "http://localhost:3000", 
  }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({
    default: 1000, 
  }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({
    default: 1000,
  }),
});
