import { Request, Response } from "express";
import { container } from "tsyringe";
import ResetPasswordUserUseCase from "./ResetPasswordUserUseCase";

export default class ResetPasswordUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.query;
    const { password } = req.body;

    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase
    );

    await resetPasswordUserUseCase.execute(String(token), password);

    return res.json({ message: "Reset password user" });
  }
}
