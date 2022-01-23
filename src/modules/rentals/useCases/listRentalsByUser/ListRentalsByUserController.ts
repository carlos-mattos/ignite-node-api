import { Request, Response } from "express";
import { container } from "tsyringe";
import ListRentalsByUserUseCase from "./ListRentalsByUserUseCase";

export default class ListRentalsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase
    );

    const rentals = await listRentalsByUserUseCase.execute(user_id);

    return res.status(200).json(rentals);
  }
}
