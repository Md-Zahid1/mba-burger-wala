import mongoose from "mongoose";
import slug from "mongoose-slug-updater"
mongoose.plugin(slug)

const schema = new mongoose.Schema({
    name: String,
    slug: { type: String, slug: ["name"], slugPaddingSize: 0, unique: true },
    staticData: String
}, { timestamps: true });

export const StaticDataModal = mongoose.model('staticData', schema)