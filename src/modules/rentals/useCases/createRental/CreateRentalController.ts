import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateRentalUseCase from "./CreateRentalUseCase";

export default class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { car_id, expect_return_date } = req.body;
    const user_id = req.user.id;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      user_id,
      expect_return_date,
    });

    return res.status(201).json(rental);
  }
}
