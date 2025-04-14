import express from 'express';
import { createCategory, updateCategory, deleteCategory, getCategories, getCategory } from '../controllers/category.controller.js';

const categoryRoutes = express.Router();

categoryRoutes.post("/", createCategory)
categoryRoutes.get("/", getCategories)
categoryRoutes.get("/:id", getCategory)
categoryRoutes.put("/:id", updateCategory)
categoryRoutes.delete("/:id", deleteCategory)

export default categoryRoutes;