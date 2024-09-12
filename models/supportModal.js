import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseSerial from "mongoose-serial"


const schema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true },
    mobile: String,
    message: String,
    note: String,
    supportStatus: {
        type: String,
        enum: ["New", "Reply"],
        default: "New"
    },
    replies: [{
        reply: String,
        replyAt: {
            type: Date,
            default: new Date()
        }
    }],
    deletedAt: {
        type: Date
    },
    serialId: String,

}, { timestamps: true });
schema.plugin(mongoosePaginate);
schema.plugin(mongooseSerial, { field: "serialId", prefix: "ST", separator: "-" });

export const SupportModal = mongoose.model('support', schema) 