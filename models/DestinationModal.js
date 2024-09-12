import mongoose from "mongoose";
import slug from "mongoose-slug-updater"
import mongoosePaginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"
import mongooseSerial from "mongoose-serial"
mongoose.plugin(slug)


const schema = new mongoose.Schema({
    title: String,
    subTitle: String,
    description: String,
    // categories: [{
    //     type: mongoose.Schema.ObjectId  
    // }],
    slug: { type: String, slug: ["title"], slugPaddingSize: 0, unique: true },

    classType: [
        { type: String }
    ],
    images: [{
        name: { type: String },
        description: { type: String },
        image: { type: String }
    }],
    placeDetails: [{
        title: { type: String },
        image: { type: String },
        description: { type: String }
    }],
    banner: String,
    state: String,
    city: String,
    likes: Number,
    isPublished: {
        type: Boolean,
        default: false
    }, 
    isFeature: {
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
schema.plugin(mongooseSerial, { field: "serialId", prefix: "DE", separator: "-" });


export const DestinationModal = mongoose.model("Destination", schema)