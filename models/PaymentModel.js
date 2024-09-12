import mongoose from "mongoose";

const schema = new mongoose.Schema({
    status: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    packegeId: { type: mongoose.Schema.Types.ObjectId, ref: "SubscriptionPackege" },
    orderDetails: {},
    payDetail: {}
}, { timestamps: true });



export const PaymentModel = mongoose.model("Payment", schema);