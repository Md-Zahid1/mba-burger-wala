import { EnquiryModal } from "../models/EnquiryModal.js";
import mongoose from "mongoose";
import { VenderModel } from "../models/VenderModel.js";
import { UserModel } from "../models/UserModel.js";
import { SupportModal } from "../models/supportModal.js";


export const dashboard = async (req, res, next) => {
    try {
        const venderId = req.params.id

        const [enquiry, user, support, venders, sortlist] = await Promise.all([
            EnquiryModal.aggregate(
                [
                    {
                        $match: venderId ? { venderId: new mongoose.Types.ObjectId(venderId) } : {}
                    },
                    {
                        $facet: {
                            generalEnquiry: [
                                {
                                    $match: {
                                        venderId: null
                                    }
                                },
                                {

                                    $group: { _id: null, total: { $sum: 1 } }
                                }
                            ],
                            specificEnquiry: [
                                {
                                    $match: {
                                        venderId: { $ne: null }
                                    }
                                },
                                {
                                    $group: { _id: null, total: { $sum: 1 } }
                                }
                            ],
                        }
                    },
                    {
                        $unwind: {
                            path: "$generalEnquiry",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$specificEnquiry",
                            preserveNullAndEmptyArrays: true
                        }
                    }
                ]
            ),
            UserModel.aggregate(
                [
                    {
                        $match: venderId ? { venderId: new mongoose.Types.ObjectId(venderId) } : {}
                    },

                    {
                        $group: { _id: "$profileStatus", total: { $sum: 1 } }
                    },
                ]
            ),
            SupportModal.aggregate(
                [
                    {
                        $match: venderId ? { venderId: new mongoose.Types.ObjectId(venderId) } : {}
                    },

                    {
                        $group: { _id: "$supportStatus", total: { $sum: 1 } }
                    },
                ]
            ),
            VenderModel.aggregate(
                [
                    {
                        $match: venderId ? { _id: new mongoose.Types.ObjectId(venderId) } : {}
                    },
                    {
                        $facet: {
                            profileStage: [
                                {
                                    $group: {
                                        _id: {

                                            profileStage: "$profileStage"
                                        },
                                        total: { $sum: 1 }
                                    }
                                },
                            ],
                            isPublished: [ 
                                {
                                    $group: {
                                        _id: {

                                            isPublished: "$isPublished"
                                        },
                                        total: { $sum: 1 }
                                    }
                                },
                            ]
                        }
                    },
                ] 
            ),
            UserModel.aggregate([
                {

                    $match: venderId ? { venderId: new mongoose.Types.ObjectId(venderId), "savedVender.0": { $exists: true } } : { "savedVender.0": { $exists: true } }
                },
                {
                    $group: {
                        _id: null, total: {
                            $sum: {
                                $size: "$savedVender"
                            }
                        }
                    }
                }
            ])
        ])


        if (!enquiry) {
            return res.status(404).json({ message: "dashboard not exist" })
        }

        return res.json({
            message: "dashboard",
            result: {
                enquiry,
                venders: {
                    profileStatus: venders[0]?.profileStatus,
                    profileStage: venders[0]?.profileStage,
                    isPublished: venders[0]?.isPublished
                },
                user,
                support,
                sortlist
            }
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