import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    customer_id: {
        type: String,
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    quantity: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    delivery_status: {
        type: Number,
        default: "pending"
    },
    payment_status: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);
