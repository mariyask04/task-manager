import mongoose, { model } from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    }
}, { timestamp: true });

export default mongoose.model("Task", taskSchema);