import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    description: String,
    onboding: {
        type: Number,
        default: 0
    },
    registration: {
        type: Number,
        default: 0
    }, 
    listing: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    bonus: {
        type: Number,
        default: 0
    }
}, { timestamps: true });



export const SubscriptionPackegeModel = mongoose.model("SubscriptionPackege", schema);