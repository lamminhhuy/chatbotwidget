import { Session } from "@/domain/entities/Session";
import { IChatbotAPI } from "../interfaces/IChatBotAPI";
import { ISessionStore } from "../interfaces/ISessionStore";
import { Author } from "@/domain/entities/Author";
import { Role } from "@/domain/enums/Role";
import { Message } from "@/domain/entities/Message";
import { VectorService } from "../services/VectorService";

export class HandleUserQuery {
  constructor(
    private chatbotAPI: IChatbotAPI,
    private sessionStore: ISessionStore,
    private vectorService: VectorService
  ) {}

  async execute(sessionId: string, content: string) {

    const session = await this.getOrCreateSession(sessionId);
    const relevantInfo = await this.retrieveRelevantInformation(content)

    const augmentedQuery = relevantInfo
    ? `You are an expert AI. I have the following information: ${relevantInfo}.\n Question: ${content}.\n 
    Please provide a concise and accurate answer based on the information above.`
    : content;

    const userMessage = this.createMessage(augmentedQuery, Role.User);
    session.addMessage(userMessage);

    const responseMessage = await this.chatbotAPI.generateResponse(userMessage.content, session.messages);
    session.addMessage(responseMessage);

    await this.sessionStore.saveSession(session.id, session);

    return { message: responseMessage, sessionId: session.id };
  }

  private async getOrCreateSession(sessionId: string): Promise<Session> {
    const existingSession = await this.sessionStore.getSession(sessionId);
    return existingSession ?? new Session();
  }

  private createMessage(content: string, role: Role): Message {
    return new Message(new Author(role, null, null), content);
  }

  private async retrieveRelevantInformation(content: string): Promise<string | null> {
    const bestMatch = await this.vectorService.findBestMatch(content);
    return bestMatch ? bestMatch.answer : null;
  }
}
