import mongoose from "mongoose";
import slug from "mongoose-slug-updater"
import aggregatePaginate from "mongoose-aggregate-paginate-v2"
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseSerial from "mongoose-serial"
mongoose.plugin(slug)


const schema = new mongoose.Schema({
    businessName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    mobile: { type: Number, required: true },
    slug: { type: String, slug: ["businessName"], slugPaddingSize: 0, unique: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    placeId: String,
    businessAddress: { type: String, required: true },
    companyName: { type: String },
    workExperience: { type: Number },
    aboutWorkShop: { type: String },
    minPrice: { type: Number },
    primaryLocation: {
        primaryState: { type: String },
        primaryCity: { type: String },
        
    },
    otherLocation: [{
        otherState: { type: String },
        otherCity: { type: String },
    }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    selectService: {
        type: String
    },
    
    additionalServices: [{
        type: String
    }],
    businessBanner: { 
        type: String
    },
    images: [{
        name: { type: String },
        description: { type: String },
        image: { type: String }
    }],
    businessDocuments: {
        type: String
    },
    businessIdProof: {
        type: String
    },
    publishVender: { type: mongoose.Schema.Types.ObjectId, ref: "PublishVender" },
    views: {
        type: Number,
        defaul: 0
    },
    like: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        defaul: false
    },
    profileStage: {
        type: String,
        enum: ["Incomplete", "New", "Active", "Inactive", "Review", "Updation"],
        default: "Incomplete"
    },
    replies: [{
        reply: String,
        replyAt: {
            type: Date,
            default: new Date()
        }
    }],
    isFeature: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    loginAt: {
        type: Date
    },
    deletedAt: {
        type: Date
    },
    alertNote: {
        type: String
    },
    otpHash: {
        type: String,
        select: false
    },
    note: String,
    serialId: String,

}, { timestamps: true });
schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);
schema.plugin(mongooseSerial, { field: "serialId", prefix: "SP", separator: "-" });


export const VenderModel = mongoose.model("Vender", schema)