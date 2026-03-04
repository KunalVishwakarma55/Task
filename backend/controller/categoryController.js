import Category from "../model/categoryModel.js";

// Add Category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) { return res.status(400).json({ message: "Category name is required" }); }
     // optional if you upload icon

    const category = await Category.create({ name });
    return res.status(201).json(category);
  } catch (error) {
    console.log("AddCategory error", error);
    return res.status(500).json({ message: `AddCategory error ${error}` });
  }
};

// List Categories
export const listCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (error) {
    console.log("ListCategories error", error);
    return res.status(500).json({ message: `ListCategories error ${error}` });
  }
};

// Remove Category
export const removeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    return res.status(200).json(category);
  } catch (error) {
    console.log("RemoveCategory error", error);
    return res.status(500).json({ message: `RemoveCategory error ${error}` });
  }
};
