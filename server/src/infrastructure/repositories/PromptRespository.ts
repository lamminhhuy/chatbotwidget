import { IPromptRepository } from "@/application/interfaces/IPromptRepository";
import PromptModel from "../models/Prompt";
import { Prompt } from "@/domain/entities/Prompt";


export class PromptRespository implements IPromptRepository {
     async getPrompts (): Promise<Prompt[]> {
        return await PromptModel.find().limit(2); 
     }
}
