import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    image4: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
        category: {
         type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
        },
        subCategory: {
         type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
        },

    date:{
        type:Number,
        required:true
    },
    sizes: {
        type: Array,
        default: []
    },
    bestseller: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
