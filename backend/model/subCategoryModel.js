import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
