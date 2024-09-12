import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"
import mongooseSerial from "mongoose-serial"


const schema = new mongoose.Schema({
    state: String,
    city: String,
    placeId: {
        type: String,
        unique: true
    },
    description: String,
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
schema.plugin(mongooseSerial, { field: "serialId", prefix: "MC", separator: "-" });

export const MetroCityModal = mongoose.model('metroCity', schema)