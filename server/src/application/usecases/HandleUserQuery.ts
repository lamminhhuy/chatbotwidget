import { Session } from "@/domain/entities/Session";
import { ChatbotAPI } from "../interfaces/ChatBotAPI";
import { SessionStore } from "../interfaces/SessionStore";
import { Author } from "@/domain/entities/Author";
import { Role } from "@/domain/enums/Role";
import { Message } from "@/domain/entities/Message";

export class HandleUserQuery {
  constructor(
    private chatbotAPI: ChatbotAPI,
    private sessionStore: SessionStore
  ) {}

  async execute(sessionId: string, content: string) {
    const session = await this.getOrCreateSession(sessionId);
    const userMessage = this.createMessage(content, Role.User);
    const responseMessage = await this.generateChatbotResponse(session, userMessage);

    session.addMessage(userMessage);
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

  private async generateChatbotResponse(session: Session, userMessage: Message): Promise<Message> {
    return this.chatbotAPI.generateResponse(userMessage.content, session.messages);
  }
}
