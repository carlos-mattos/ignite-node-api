import CreateRentalController from "@modules/rentals/useCases/createRental/CreateRentalController";
import DevolutionRentalController from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import ListRentalsByUserController from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id{ car_id }",
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalRoutes.get("/", ensureAuthenticated, listRentalsByUserController.handle);

export default rentalRoutes;
