import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"
import mongooseSerial from "mongoose-serial"


const schema = new mongoose.Schema({
    userId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rate: { type: Number, min: [1], max: [5] },
    comment: { type: String },
    badges: [{ type: String }],
    venderId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "PublishVender" },
    reply: { type: String },
    rattingStatus: {
        type: String,
        enum: ["Approve", "Denied"]
    },
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
schema.plugin(aggregatePaginate);
schema.plugin(mongooseSerial, { field: "serialId", prefix: "RB", separator: "-" });

export const RattingModal = mongoose.model('ratting', schema)