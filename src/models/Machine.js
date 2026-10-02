import mongoose  from "mongoose";   
import { type } from "node:os";

const machineSchema = new mongoose.Schema({
    reference: {
        type: String,
        required :true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    workshop: {
        type: String,
        required: true
    }, 
    status: {
        type: String,
        emun: ["available" , "maintenance" ,"out_of_service"],
        default: "available"
    }
},{ timestamps: true});

export default mongoose.model("machine" ,machineSchema)