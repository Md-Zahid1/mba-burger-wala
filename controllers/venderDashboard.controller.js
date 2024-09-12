import mongoose from "mongoose";
import { UserModel } from "../models/UserModel.js";
import { PortfolioModal } from "../models/PortfolioModal.js"
import { EnquiryModal } from "../models/EnquiryModal.js";


export const vendorDashboard = async (req, res, next) => {
    try {
        const venderId = req.params.id
        const saved = await UserModel.aggregate([
            {
                $match: venderId ? { savedVender: { $in: [new mongoose.Types.ObjectId(venderId)] } } : {}
            },
            {
                $group: { _id: null, total: { $sum: 1 } }
            },
 
        ])
        const portfolio = await PortfolioModal.aggregate([
            {
                $match: venderId ? { venderId: new mongoose.Types.ObjectId(venderId) } : {}
            },
            {
                $group: { _id: null, total: { $sum: 1 } }
            },

        ])
       const query = await EnquiryModal.aggregate(
            [
                {
                    $match: venderId ? { venderId: new mongoose.Types.ObjectId(venderId) } : {}
                },
                {

                    $group: { _id: null, total: { $sum: 1 } }
                }

            ]
        )

        return res.json({
            message: "dashboard",
            result: { saved: saved, portfolio: portfolio , query: query}
        })

    } catch (err) {
        return res.status(500).json({
            error: {
                message: err.message,
                error: err
            }
        });
    }
}