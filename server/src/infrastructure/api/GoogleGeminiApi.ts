import { ChatbotAPI } from "@/application/interfaces/ChatBotAPI";
import { Author } from "@/domain/entities/Author";
import { Message } from "@/domain/entities/Message";
import { Role } from "@/domain/enums/Role";
import {
  BadRequestResponseError,
  ErrorsResponse,
} from "@/shared/response/errors.response";
import { StatusCode } from "@/shared/types/statusCode";
import {
  GenerativeModel,
  GoogleGenerativeAI,
  GenerateContentResult,
  StartChatParams,
  Content,
} from "@google/generative-ai";

export class GoogleGeminiAPI implements ChatbotAPI {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(private readonly apiKey: string) {
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateResponse(
    userInput: string,
    chatHistory: Message[]
  ): Promise<Message> {
    const history = this.transformChatHistory(chatHistory);
    const chat = this.model.startChat({ history });

    try {
      const result = await chat.sendMessage(userInput);
      const response = this.extractResponse(result);

      if (!response) {
        throw new ErrorsResponse(
          "Invalid or empty response from Gemini API.",
          StatusCode.CONFLICT
        );
      }

      return this.createMessage(response);
    } catch (error) {
      console.error("Error in generateResponse:", error);
      throw new BadRequestResponseError(
        "Failed to generate response from Gemini API."
      );
    }
  }

  private transformChatHistory(chatHistory: Message[]): Content[] {
    return chatHistory.map((message) => ({
      role: message.author.role,
      parts: [{ text: message.content }],
    }));
  }

  private extractResponse(result: GenerateContentResult): string | null {
    return result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  }

  private createMessage(content: string): Message {
    return new Message(
      new Author(Role.Assistant, "Google Gemini API", null),
      content
    );
  }
}
