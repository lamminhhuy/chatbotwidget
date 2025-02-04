
import asyncHandler from "@/shared/utils/asyncHandler";
import { Request, Response, Router } from "express";
import { PromptController } from "../controllers/PromptController";
import { HandleFetchPrompt } from "@/application/usecases/HandleFetchPrompt";
import { PromptRespository } from "@/infrastructure/repositories/PromptRespository";
;

const promptRouter = Router();
const promptRepository = new PromptRespository()
const handleFetchPrompt = new HandleFetchPrompt(promptRepository)
const promptController = new PromptController(handleFetchPrompt)

promptRouter.get(
  "/",
  asyncHandler((req: Request, res: Response) =>
    promptController.handleFetchAll(req, res)
  )
);

export default promptRouter;
