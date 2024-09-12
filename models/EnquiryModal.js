import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseSerial from "mongoose-serial"



const schema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, lowercase: true, trim: true },
    mobile: Number,
    event: String,
    date: Date, 
    service: String,  
    city: String,
    state: String,
    budget: Number,
    message: String,
    venderId: { type: mongoose.Schema.Types.ObjectId, ref: "PublishVender" },
    replies: [{
        reply: String,
        replyAt: { 
            type: Date,
            default: new Date()
        }

    }],
    note: { type: String },
    enquiryStatus: {
        type: String,
        enum: ["New", "Reply"],
        default: "New" 
    },
    deletedAt: {
        type: Date
    },
    serialId: String,

}, { timestamps: true });
schema.plugin(mongoosePaginate);
schema.plugin(mongooseSerial, { field: "serialId", prefix: "GE", separator: "-" });


export const EnquiryModal = mongoose.model("enquiry", schema) 