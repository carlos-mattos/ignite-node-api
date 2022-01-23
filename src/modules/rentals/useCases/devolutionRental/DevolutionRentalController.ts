import { Request, Response } from "express";
import { container } from "tsyringe";
import DevolutionRentalUseCase from "./DevolutionRentalUserCase";

export default class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const user_id = req.body.user;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({ id, user_id });

    return res.status(200).json(rental);
  }
}
