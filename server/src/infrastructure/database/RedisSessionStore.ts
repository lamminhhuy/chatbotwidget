// src/infrastructure/RedisSessionStore.ts

import { ISessionStore } from "@/application/interfaces/ISessionStore";
import { Session } from "@/domain/entities/Session";
import { RedisClientType } from "redis";
export class RedisSessionStore implements ISessionStore {
  private client;
  constructor(client: RedisClientType) {
    this.client = client;
  }

  async saveSession(sessionId: string, session: Session): Promise<void> {
    await this.client.set(sessionId, JSON.stringify(session));
  }

  async getSession(sessionId: string): Promise<Session | null> {
    if (!sessionId) return null;
    const sessionData = await this.client.get(sessionId);

    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      const session = new Session(sessionId);
      session.messages = parsedData.messages || [];
      return session;
    }

    return null;
  }
}
