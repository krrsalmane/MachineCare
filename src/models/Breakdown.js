import mongoose from "mongoose";

const breakdownSchema = new mongoose.Schema({
    machine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Machine",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["open", "in_progress", "resolved"],
        default: "open"
    }
}, { timestamps: true });

export default mongoose.model("Breakdown", breakdownSchema);