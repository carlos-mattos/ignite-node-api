import CreateSpefificationController from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";
import ensureAdmin from '../middlewares/ensureAdmin';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpefificationController();

specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

export default specificationsRoutes;
