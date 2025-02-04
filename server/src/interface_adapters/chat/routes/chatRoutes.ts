import { GoogleGeminiAPI } from "@/infrastructure/api/GoogleGeminiApi";
import { ChatController } from "../controllers/ChatController";
import { HandleUserQuery } from "@/application/usecases/HandleUserQuery";
import { RedisSessionStore } from "@/infrastructure/database/RedisSessionStore";
import { Request, Response, Router } from "express";
import { chatSchema } from "../validators/ChatValidator";
import { validateRequest } from "@/shared/middlewares/validateRequest/validateRequest";
import { env } from "@/configs/envConfig";
import { redisInstance } from "@/shared/utils/redisClient";
import asyncHandler from "@/shared/utils/asyncHandler";
import { VectorService } from "@/application/services/VectorService";
import { VectorRepositoryImpl } from "@/infrastructure/repositories/VectorRepository";

const chatRouter = Router();
const sessionStore = new RedisSessionStore(redisInstance);
const chatbotAPI = new GoogleGeminiAPI(env.GOOGLE_GEMINI_API_KEY);
const vectorRepository = new VectorRepositoryImpl()
const vectorService = new VectorService(vectorRepository,chatbotAPI)
const handleUserQuery = new HandleUserQuery(chatbotAPI, sessionStore,vectorService);
const chatController = new ChatController(handleUserQuery);

chatRouter.post(
  "/",
  validateRequest(chatSchema),
  asyncHandler((req: Request, res: Response) =>
    chatController.handleChat(req, res)
  )
);

export default chatRouter;
