import ListCarsUseCase from "./ListCarsUseCase";
import { Response, Request } from "express";
import { container } from "tsyringe";

export default class ListCarsController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { category_id, brand, name } = req.query;

    const listCarsUseCase = container.resolve(ListCarsUseCase);

    const cars = await listCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });

    return res.json(cars);
  }
}
