import { Message } from "@/domain/entities/Message";

export interface ChatbotAPI {
  generateResponse(userInput: string, messages: Message[]): Promise<Message>;
}
