import dotenv from "dotenv";
import { cleanEnv, host, num, port, str } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    devDefault: "dev",
    choices: ["dev", "pro", "test"],
  }),
  GOOGLE_GEMINI_API_KEY: str(),
  HOST: host({ devDefault: "localhost" }),
  PORT: port({ devDefault: 3000 }),
  CORS_ORIGIN: str({ devDefault: "http://localhost:3000" }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: 1000 }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: 1000 }),
});
