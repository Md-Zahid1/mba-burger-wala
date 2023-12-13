import mongoose from "mongoose";


const schema = new mongoose.Schema({
    name: String,
    photo: String,
    googleId: {
        type: String,
        required: true,
        unique: true,
    },

    role: {
        type: "String",
        enum: ["admin", "user"],
        default: "user"
    },

    createdAd: {
        type: Date,
        default: Date.now,
    }
});


export const UserModel = mongoose.model("User", schema)