import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

export default class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;

    console.log("aqui");
    
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUserUseCase.execute({ password, email });

    return res.json(token);
  }
}
