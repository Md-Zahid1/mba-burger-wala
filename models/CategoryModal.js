import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import slug from "mongoose-slug-updater"
import mongooseSerial from "mongoose-serial"
mongoose.plugin(slug)


const schema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    slug: { type: String, slug: ["name"], slugPaddingSize: 0, unique: true },
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
schema.plugin(mongooseSerial, { field: "serialId", prefix: "CT", separator: "-" });

export const CategoryModel = mongoose.model("Category", schema) 