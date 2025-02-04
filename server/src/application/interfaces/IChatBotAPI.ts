import { Message } from "@/domain/entities/Message";

export interface IChatbotAPI {
  generateResponse(userInput: string, messages: Message[]): Promise<Message>;
  generateEmbedding(text: string): Promise<number[]>;
}
