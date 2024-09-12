import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"
import mongooseSerial from "mongoose-serial"


const schema = new mongoose.Schema({
    message: String,
    action: String,
    note: String,
    description: String,
    actionOn: {
        type: String,
        enum: [
            "user",
            "vender",
            "support",
            "enquiry",
            "destination",
            "category",
            "metroCity",
            "portfolio",
            "rating",
            "staticPage"
        ]
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    venderId: { type: mongoose.Schema.Types.ObjectId, ref: "Vender" },
    supportId: { type: mongoose.Schema.Types.ObjectId, ref: "support" },
    enquiryId: { type: mongoose.Schema.Types.ObjectId, ref: "enquiry" },
    destinationId: { type: mongoose.Schema.Types.ObjectId, ref: "Destination" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    metroCityId: { type: mongoose.Schema.Types.ObjectId, ref: "metroCity" },
    portfolioId: { type: mongoose.Schema.Types.ObjectId, ref: "portfolio" },
    rattingId: { type: mongoose.Schema.Types.ObjectId, ref: "ratting" },
    staticPageId: { type: mongoose.Schema.Types.ObjectId, ref: "staticPage" },
    deletedAt: {
        type: Date
    },
    serialId: String

}, { timestamps: true });
schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);
schema.plugin(mongooseSerial, { field: "serialId", prefix: "AC", separator: "-" });


export const ActivityModal = mongoose.model('activity', schema)