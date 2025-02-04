import { IPromptRepository } from "../interfaces/IPromptRepository";

export class HandleFetchPrompt  {
    constructor(private promptRepo: IPromptRepository){}
    async execute (){
     return await this.promptRepo.getPrompts()   
    }
}