import { Request, Response } from "express";
import { container } from "tsyringe";
import UploadCarImageUseCase from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

export default class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const images = req.files as IFiles[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImageUseCase);

    const images_name = images.map((image) => image.filename);

    await uploadCarImagesUseCase.execute({ car_id: id, images_name });

    return res.status(201).send();
  }
}
