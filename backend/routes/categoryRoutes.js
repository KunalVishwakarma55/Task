import express from "express";
import { addCategory, listCategories, removeCategory } from "../controller/categoryController.js";

const categoryrouter = express.Router();

categoryrouter.post("/addcategory", addCategory);
categoryrouter.get("/getcategories", listCategories);
categoryrouter.delete("/removecategory/:id", removeCategory);

export default categoryrouter;
