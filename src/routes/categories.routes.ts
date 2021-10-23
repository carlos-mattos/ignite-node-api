import { Router } from "express";
import { v4 as uuid } from "uuid";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const newCategory = { name, description, id: uuid() };

  categories.push(newCategory);

  return res.status(201).send();
});

export default categoriesRoutes;
