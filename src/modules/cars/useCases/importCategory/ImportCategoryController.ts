import { Request, Response } from "express";

export default class ImportCategoryController {
  handle(req: Request, res: Response): Response {
    const { file } = req;

    console.log(file);

    return res.send();
  }
}
