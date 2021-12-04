import { Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CreateSpefificationController from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpefificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);

export default specificationsRoutes;
