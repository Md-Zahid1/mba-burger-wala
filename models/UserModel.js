import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseSerial from "mongoose-serial"


const schema = new mongoose.Schema({
    name: String,
    avatar: String,
    password: String,
    mobile: {
        type: String,
        trim: true
    },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    googleId: {
        type: String,
        required: false,
        // unique: true,
    },
    savedVender: [{
        type: mongoose.Schema.Types.ObjectId, ref: "PublishVender"
    }],
    likeVender: [{
        type: mongoose.Schema.Types.ObjectId, ref: "PublishVender"
    }],
    likeDestination: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Destination"
    }],
    venderId: { type: mongoose.Schema.Types.ObjectId, ref: "Vender" },
    isChecked: {
        type: Boolean,
        default: false
    },
    role: {
        type: "String",
        enum: ["admin", "vendor", "user"],
        default: "user"
    },
    profileStatus: {
        enum: ["Inactive", "New", "Active", "Blocked"],
        type: String,
        default: "Inactive"
    },
    loginAt: {
        type: Date
    },
    deletedAt: {
        type: Date
    },
    otpHash: {
        type: String,
        select: false
    },
    note: String,
    serialId: String,
}, { timestamps: true });
schema.plugin(mongoosePaginate);
schema.plugin(mongooseSerial, { field: "serialId", prefix: "CL", separator: "-" });

export const UserModel = mongoose.model("User", schema)