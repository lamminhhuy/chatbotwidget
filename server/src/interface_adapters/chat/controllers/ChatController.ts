import { HandleUserQuery } from "@/application/usecases/HandleUserQuery";
import { SuccessResponse } from "@/shared/response/success.response";
import { Request, Response } from "express";

export class ChatController {
  constructor(private handleUserQuery: HandleUserQuery) {}

  async handleChat(req: Request, res: Response): Promise<void> {
    const { content } = req.body;
    const sessionId = req.cookies["sessionId"];
    const result = await this.handleUserQuery.execute(sessionId, content);

    if (result.sessionId) {
      res.cookie("sessionId", result.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
    }

    new SuccessResponse({
      message: "Query executed successfully",
      data: { message: result.message },
    }).send(res);
  }
}
