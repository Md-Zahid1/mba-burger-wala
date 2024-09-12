import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import slug from "mongoose-slug-updater"
mongoose.plugin(slug)
import mongooseSerial from "mongoose-serial"


const schema = new mongoose.Schema({
    name: String,
    slug: { type: String, slug: ["name"], slugPaddingSize: 0, unique: true },
    staticData: String,
    description: String,
    note: String,
    isPublished: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    },
    serialId: String,

}, { timestamps: true });
schema.plugin(mongoosePaginate);
schema.plugin(mongooseSerial, { field: "serialId", prefix: "SG", separator: "-" });

export const StaticPageModal = mongoose.model('staticPage', schema)