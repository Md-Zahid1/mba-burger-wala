import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseSerial from "mongoose-serial"

const schema = new mongoose.Schema({
    question: String,
    answer: String,
    isPublished: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    },
    serialId: String,
}, { timestamps: true });
schema.plugin(mongoosePaginate);
schema.plugin(mongooseSerial, { field: "serialId", prefix: "FQ", separator: "-" });

export const FAQModal = mongoose.model("faq", schema)