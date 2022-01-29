import { Response, Request } from "express";
import { container } from "tsyringe";
import SendForgotPasswordMailUseCase from "./SendForgotPasswordMailUseCase";

export default class SendForgotPasswordMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase
    );

    await sendForgotPasswordMailUseCase.execute(email);

    return res.send();
  }
}
