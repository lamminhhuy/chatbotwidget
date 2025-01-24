import rateLimiter from "@/shared/middlewares/rateLimiter";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { errorHandler } from "@/shared/middlewares/error/errorHanlder";
import chatRouter from "@/interface_adapters/chat/routes/chatRoutes";
import cookieParser from "cookie-parser";
import  morgan  from 'morgan';

const logger = pino({ name: "server start" });
const app: Express = express();

app.use(cookieParser());
app.set("trust proxy", true);
app.use(morgan('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true, 
    })
  );
app.use(helmet());
app.use(rateLimiter);

app.use(`/api/v1`, chatRouter);

app.use(errorHandler);

export { app, logger };
