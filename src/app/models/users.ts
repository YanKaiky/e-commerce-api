import mongoose from "mongoose";

const Users = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Users", Users);
