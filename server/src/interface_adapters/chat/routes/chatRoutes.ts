import { GoogleGeminiAPI } from "@/infrastructure/api/GoogleGeminiApi";
import { ChatController } from "../controllers/ChatController";
import { HandleUserQuery } from "@/application/usecases/HandleUserQuery";
import { RedisSessionStore } from "@/infrastructure/database/RedisSessionStore";
import { Request, Response, Router } from "express";
import { chatSchema } from "../validators/ChatValidator";
import { validateRequest } from "@/shared/middlewares/validateRequest/validateRequest";
import { env } from "@/shared/utils/envConfig";
import { RedisClient } from "@/shared/utils/redisClient";
import asyncHandler from "@/shared/utils/asyncHandler";

const chatRouter = Router();
const redisInstance = await RedisClient.getInstance();
const sessionStore = new RedisSessionStore(redisInstance.getClient());
const chatbotAPI = new GoogleGeminiAPI(env.GOOGLE_GEMINI_API_KEY);
const handleUserQuery = new HandleUserQuery(chatbotAPI, sessionStore);
const chatController = new ChatController(handleUserQuery);

chatRouter.post(
  "/chat",
  validateRequest(chatSchema),
  asyncHandler((req: Request, res: Response) =>
    chatController.handleChat(req, res)
  )
);

export default chatRouter;
