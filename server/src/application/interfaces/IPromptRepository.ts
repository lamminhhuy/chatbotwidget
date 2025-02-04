import { Prompt } from "@/domain/entities/Prompt";

export interface IPromptRepository {
    getPrompts: () => Promise<Prompt[]>
}