import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCarUseCase from "./CreateCarUseCase";

export default class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      brand,
      license_plate,
      fine_amount,
      description,
      daily_rate,
      category_id,
      name,
    } = req.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      brand,
      license_plate,
      fine_amount,
      description,
      daily_rate,
      category_id,
      name,
    });

    return res.status(201).json({ message: "Carro criado com sucesso", car });
  }
}
