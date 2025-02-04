import { Session } from "@/domain/entities/Session";

export interface ISessionStore {
  saveSession(sessionId: string, session: Session): Promise<void>;
  getSession(sessionId: string): Promise<Session | null>;
}
