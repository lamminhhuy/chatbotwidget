import { openAPIRouter } from "@/api-docs/openAPIRouter";
import rateLimiter from "@/shared/middlewares/rateLimiter";
import requestLogger from "@/shared/middlewares/logging/requestLogger";
import { env } from "@/shared/utils/envConfig";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

const logger = pino({ name: "server start" });

const app: Express = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

app.use(requestLogger);

app.use(openAPIRouter);

export { app, logger };
