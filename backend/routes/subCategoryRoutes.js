import express from "express";
import { addSubCategory, listSubCategories, removeSubCategory } from "../controller/subCategoryController.js";

const subcategoryrouter = express.Router();

subcategoryrouter.post("/addsubcategory", addSubCategory);
subcategoryrouter.get("/getsubcategories", listSubCategories);
subcategoryrouter.delete("/removesubcategory/:id", removeSubCategory);

export default subcategoryrouter;
