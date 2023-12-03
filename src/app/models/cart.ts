import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products"
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }
    ]
}, { timestamps: true });

export default mongoose.model("Cart", CartSchema);
