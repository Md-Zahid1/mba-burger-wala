import mongoose from "mongoose";
import slug from "mongoose-slug-updater"
import aggregatePaginate from "mongoose-aggregate-paginate-v2"
import mongoosePaginate from "mongoose-paginate-v2";
mongoose.plugin(slug)

const schema = new mongoose.Schema({
    businessName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    mobile: { type: Number, required: true },
    slug: { type: String, slug: ["businessName"], slugPaddingSize: 0, unique: true },
    email: { type: String, unique: true },
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
    vender: { type: mongoose.Schema.Types.ObjectId, ref: "Vender" },
    isPublished: {
        type: Boolean,
        default: false
    },
    isFeature: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        select: false
    },

}, { timestamps: true });
schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);


export const PublishVenderModel = mongoose.model("PublishVender", schema)