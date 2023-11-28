import mongoose from "mongoose";

const Products = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    product_location: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Products", Products);
