import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseSerial from "mongoose-serial"


const schema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    url: { type: String },
    type: { type: String },
    venderId: { type: mongoose.Schema.Types.ObjectId, ref: "Vender" },
    isPublished: {
        type: Boolean,
        default: false
    }, 
    deletedAt: {
        type: Date
    },
    serialId: String

}, { timestamps: true });
schema.plugin(mongoosePaginate);
schema.plugin(mongooseSerial, { field: "serialId", prefix: "PF", separator: "-" });

export const PortfolioModal = mongoose.model('portfolio', schema) 