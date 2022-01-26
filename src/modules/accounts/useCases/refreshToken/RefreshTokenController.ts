import { Request, Response } from "express";

export default class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    return res.json({ token: "token" });
  }
}
