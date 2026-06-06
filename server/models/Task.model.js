import mongoose, { model } from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);