import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // select: false,
    },
    location: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model("Users", UsersSchema);
