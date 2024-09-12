import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseSerial from "mongoose-serial"


const schema = new mongoose.Schema({
    ipAddress: { type: String, unique: true, required: true, lowercase: true, trim: true },
    savedVender: [{
        type: mongoose.Schema.Types.ObjectId, ref: "PublishVender"
    }],
    likeVender: [{
        type: mongoose.Schema.Types.ObjectId, ref: "PublishVender"
    }],
    viewVender: [{
        type: mongoose.Schema.Types.ObjectId, ref: "PublishVender"
    }],
    likeDestination: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Destination"
    }],
    viewDestination: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Destination"
    }],
    deletedAt: {
        type: Date
    },
    note: String,
    serialId: String,
}, { timestamps: true });
schema.plugin(mongoosePaginate);
schema.plugin(mongooseSerial, { field: "serialId", prefix: "IP", separator: "-" });

export const AnonymousModal = mongoose.model("anonymous", schema)