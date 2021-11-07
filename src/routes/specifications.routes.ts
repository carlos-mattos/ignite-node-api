import { Router } from "express";
import CreateSpefificationController from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpefificationController();

specificationsRoutes.post("/", createSpecificationController.handle);

export default specificationsRoutes;
