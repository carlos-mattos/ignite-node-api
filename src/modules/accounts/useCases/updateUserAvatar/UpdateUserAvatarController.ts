import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateUserAvatarUseCase from "./UpdateUserAvatarUseCase";

export default class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatar_file = req.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
    await updateUserAvatarUseCase.execute({ avatar_file, user_id: id });

    return res.status(204).send();
  }
}
