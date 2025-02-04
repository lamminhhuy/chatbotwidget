import { QAVector } from "@/domain/entities/QAVector";
import { IChatbotAPI } from "../interfaces/IChatBotAPI";
import { IVectorRepository } from "../interfaces/IVectorRepository";

export class VectorService {
    constructor(
      private dbService: IVectorRepository,
      private embeddingService: IChatbotAPI,
    ) {}
  
    async findBestMatch(content: string) {
      const queryEmbedding = await this.embeddingService.generateEmbedding(content);
      return await this.dbService.findSimilarQuestions(queryEmbedding);  
    }
  }
  