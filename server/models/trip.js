import mongoose  from "mongoose";

const TripSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    location:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment",
        required: true
    }],
    status:{
        type: String,
        enum: ["ongoing", "completed"],
        default: "ongoing"
    }
    
}, { timestamps: true });

export const Trip = mongoose.model("Trip", TripSchema);