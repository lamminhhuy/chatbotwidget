import { HandleFetchPrompt } from "@/application/usecases/HandleFetchPrompt";
import { SuccessResponse } from "@/shared/response/success.response";
import { Request, Response } from "express";


export class PromptController {
 constructor(private handleFetchPrompt:HandleFetchPrompt){}
 async handleFetchAll (req: Request, res: Response){
  const prompts =  await this.handleFetchPrompt.execute()
   new SuccessResponse({
    message: "Query executed successfully",
    data: {prompts},
  }).send(res);
 }
}
