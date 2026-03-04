import SubCategory from "../model/subCategoryModel.js";

// Add SubCategory
export const addSubCategory = async (req, res) => {
  try {
    const { categoryId, name } = req.body;

    const subCategory = await SubCategory.create({ categoryId, name });
    return res.status(201).json(subCategory);
  } catch (error) {
    console.log("AddSubCategory error", error);
    return res.status(500).json({ message: `AddSubCategory error ${error}` });
  }
};

// List SubCategories
export const listSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({}).populate("categoryId");
    return res.status(200).json(subCategories);
  } catch (error) {
    console.log("ListSubCategories error", error);
    return res.status(500).json({ message: `ListSubCategories error ${error}` });
  }
};

// Remove SubCategory
export const removeSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findByIdAndDelete(id);
    return res.status(200).json(subCategory);
  } catch (error) {
    console.log("RemoveSubCategory error", error);
    return res.status(500).json({ message: `RemoveSubCategory error ${error}` });
  }
};
