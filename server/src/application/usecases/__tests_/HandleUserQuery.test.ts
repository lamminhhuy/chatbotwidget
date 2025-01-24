import { describe, it, beforeEach, expect, vi, Mock } from "vitest";
import { Role } from "@/domain/enums/Role";
import { Session } from "@/domain/entities/Session";
import { Message } from "@/domain/entities/Message";
import { Author } from "@/domain/entities/Author";
import { ChatbotAPI } from "@/application/interfaces/ChatBotAPI";
import { SessionStore } from "@/application/interfaces/SessionStore";
import { HandleUserQuery } from "../HandleUserQuery";

describe("HandleUserQuery", () => {
  let mockChatbotAPI: ChatbotAPI;
  let mockSessionStore: SessionStore;
  let handleUserQuery: HandleUserQuery;

  beforeEach(() => {
    mockChatbotAPI = {
      generateResponse: vi.fn() as Mock, 
    };

    mockSessionStore = {
      getSession: vi.fn() as Mock,
      saveSession: vi.fn() as Mock,
    };

    handleUserQuery = new HandleUserQuery(mockChatbotAPI, mockSessionStore);
  });

  it("should create a new session if no existing session is found", async () => {
    (mockSessionStore.getSession as Mock).mockResolvedValueOnce(null);
    (mockChatbotAPI.generateResponse as Mock).mockResolvedValueOnce(
      new Message(new Author(Role.Assistant, null, null), "Response from chatbot")
    );

    const result = await handleUserQuery.execute("new-session-id", "Hello!");

    expect(mockSessionStore.getSession).toHaveBeenCalledWith("new-session-id");
    expect(mockSessionStore.saveSession).toHaveBeenCalledWith(
      result.sessionId,
      expect.any(Session)
    );
    expect(result.message.content).toBe("Response from chatbot");
  });

  it("should use an existing session if found", async () => {
    const existingSession = new Session();
    (mockSessionStore.getSession as Mock).mockResolvedValueOnce(existingSession);
    (mockChatbotAPI.generateResponse as Mock).mockResolvedValueOnce(
      new Message(new Author(Role.Assistant, null, null), "Chatbot response")
    );

    const result = await handleUserQuery.execute("existing-session-id", "How are you?");

    expect(mockSessionStore.getSession).toHaveBeenCalledWith("existing-session-id");
    expect(mockSessionStore.saveSession).toHaveBeenCalledWith(
      existingSession.id,
      expect.any(Session)
    );
    expect(result.message.content).toBe("Chatbot response");
  });

  it("should add user and chatbot messages to the session", async () => {
    const session = new Session();
    (mockSessionStore.getSession as Mock).mockResolvedValueOnce(session);
    (mockChatbotAPI.generateResponse as Mock).mockResolvedValueOnce(
      new Message(new Author(Role.Assistant, null, null), "Hello from the bot")
    );

    const result = await handleUserQuery.execute("session-id", "User question");

    expect(session.messages.length).toBe(2);
    expect(session.messages[0].content).toBe("User question");
    expect(session.messages[0].author.role).toBe(Role.User);
    expect(session.messages[1].content).toBe("Hello from the bot");
    expect(session.messages[1].author.role).toBe(Role.Assistant);
  });

  it("should save the updated session", async () => {
    const session = new Session();
    (mockSessionStore.getSession as Mock).mockResolvedValueOnce(session);
    (mockChatbotAPI.generateResponse as Mock).mockResolvedValueOnce(
      new Message(new Author(Role.Assistant, null, null), "Bot reply")
    );

    await handleUserQuery.execute("session-id", "User input");

    expect(mockSessionStore.saveSession).toHaveBeenCalledTimes(1);
    expect(mockSessionStore.saveSession).toHaveBeenCalledWith(session.id, session);
  });

  it("should throw an error if ChatbotAPI fails", async () => {
    (mockSessionStore.getSession as Mock).mockResolvedValueOnce(null); 
    (mockChatbotAPI.generateResponse as Mock).mockRejectedValueOnce(new Error("API Error"));

    await expect(
      handleUserQuery.execute("session-id", "User input")
    ).rejects.toThrow("API Error");

    expect(mockChatbotAPI.generateResponse).toHaveBeenCalledWith(
      "User input",
      expect.any(Array)
    );
  });
});
