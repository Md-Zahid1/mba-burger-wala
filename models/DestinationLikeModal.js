import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

const schema = new mongoose.Schema({
    userId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" },
    like: { type: Number },
    venderId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "PublishVender" },
    deletedAt: {
        type: Date
    },

}, { timestamps: true });
schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

export const DestinationLikeModal = mongoose.model('destinationLike', schema)