import { PublishVenderModel } from "../models/PublishVenderModal.js";
import { VenderModel } from "../models/VenderModel.js"
import { addActivity } from "../services/activity.js";
import { aleartNote } from "../services/aleartNote.js";
import { alertToVender } from "../services/alerts/alertToUser.js";
import { vendersViewsUpdate } from "../services/anonymousService.js";
import { sandEmailToAdmin } from "../services/email/adminEmail.js";
import { sendEmailToUser } from "../services/email/userEmail.js";
import { sendEmailToVender } from "../services/email/venderEmail.js";
import errorHandlers from "../utils/errorHandlers.js";
import parseObject from "../utils/queryType.js";
import crypto from "crypto"

export const venderRegister = async (req, res, next) => {

    try {
        const { email } = req.body;
        const vender = await VenderModel.create(req.body)
        console.log('vender', vender)
        if (email) {

        }
        const otp = crypto.randomInt(100000, 999999);
        const expires = Date.now() + 1000 * 60 * 10;
        const otpHash = `${otp}.${expires}`;
        const venderData = await VenderModel.findByIdAndUpdate(vender._id, { otpHash })
        await sendEmailToVender("registerVendorOtp", vender, { otp })

        return res.status(201).json({
            message: "verder created Seccessfuly",
            result: venderData
        })

    } catch (err) {
        const error = await errorHandlers(err);
        return res.status(error.status).json({
            message: error.message,
            error: error,
        })
    }
}


export const addBusinessProfile = async (req, res, next) => {
              console.log(req.body.venderId)  
   try {
        const businessProfile = await VenderModel.findByIdAndUpdate(req.body.venderId, {...req.body, profileStage : "New"}, { new: true })
        if (!businessProfile) {
            return res.status(404).json({ message: "vendor Not Faund" })
        } await sendEmailToVender("vendorDetailSubmit", businessProfile)
        await sandEmailToAdmin("adminOnVenderDetailSubmit")

        return res.status(200).json({ 
            message: "businessProfile updated Seccessfuly",
            result: businessProfile,
            alert: alertToVender("editProfile")
        })
    } catch (err) {
        console.log("err", err)
        const error = await errorHandlers(err);
        return res.status(error.status).json({
            message: error.message,
            error: error,
        })
    }
}

export const feacherVendor = async (req, res, next) => {
    try {
        const {
            venderId,
        } = req.body;

        const vendor = await VenderModel.findById(venderId);


        const isFeachered = !!vendor?.isFeature

        console.log("isFeacher", isFeachered)

        const publisVender = await PublishVenderModel.findByIdAndUpdate(
            venderId,
            { isFeature: !isFeachered }, { new: true }
        );

        const updateVender = await VenderModel.findByIdAndUpdate(venderId, { isFeature: !isFeachered }, { new: true })
        // await sendEmailToVender("vendorDetailSubmit", businessProfile)
        // await sandEmailToAdmin("adminOnVenderDetailSubmit")

        return res.status(200).json({
            message: `${!isFeachered ? "Added" : "Removed"} Feacher Seccessfuly`,
            result: updateVender
        })
    } catch (err) {
        return res.status(500).json({
            error: {
                message: err.message,
                error: err
            }
        })
    }
}

export const publishVendor = async (req, res, next) => {
    try {
        const {
            venderId,
        } = req.body;

        const vendor = await VenderModel.findById(venderId).lean();


        const { _id, isPublished, ...rest } = vendor;
        console.log('rest', rest)

        console.log("isPublished", isPublished)

        const publishVender = await PublishVenderModel.findOneAndUpdate(
            { vender: _id },
            { ...rest, vender: _id, isPublished: !isPublished }, { new: true, upsert: true }
        );

        console.log("publishVender", publishVender.isPublished)


        const updateVender = await VenderModel.findByIdAndUpdate(venderId, {
            publishVender: publishVender._id,
            profileStatus: "Active",
            profileStage: aleartNote(""),
            isPublished: !isPublished
        }, { new: true })
        // await sendEmailToVender("vendorDetailSubmit", businessProfile)
        // await sandEmailToAdmin("adminOnVenderDetailSubmit")
        console.log("updateVendor", updateVender.isPublished)
        addActivity("vender", "publish", publishVender._id)

        return res.status(200).json({
            message: `${!isPublished ? "Added" : "Removed"} Publish Seccessfuly`,
            result: updateVender
        })
    } catch (err) {
        console.log("errr", err)
        return res.status(500).json({
            error: {
                message: err.message,
                error: err
            }
        })
    }
}


export const venderCreate = async (req, res, next) => {

    try {

        const vender = await VenderModel.create(req.body)
        addActivity("vender", "create", vender._id)

        return res.status(200).json({
            message: "Vender Create Seccessfuly",
            result: vender
        })
    } catch (err) {
        return res.status(500).json({
            error: {
                message: err.message,
                error: err
            }
        })
    }
}


export const venderInfo = async (req, res, next) => {

    try {
        console.log('req.body', req.query)
        const filter = [{ deletedAt: { $exists: false } }];
        if (req.query.filter) {
            filter.push(req.query.filter)
        }
        if (req.query.search) { 
            filter.push({
                $or: [
                    { businessName: { '$regex': req.query.search, '$options': 'i' } },
                    { contactPerson: { '$regex': req.query.search, '$options': 'i' } },
                ]
            })
        }
        const vender = await VenderModel.paginate(filter.length ? { $and: filter } : {}, req.query)
        if (!vender) {
            return res.status(404).json({ message: "vender not exist!" });
        }

        return res.json({
            message: "Vender Info",
            result: vender
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

export const venders = async (req, res, next) => {
    try {
        let { rating, ...query } = parseObject(req.query.filter)
        const filter = [{ isPublished: true }];
        if (query) {
            filter.push(query)
        }
        if (req.query.search) {
            filter.push({
                $or: [
                    { businessName: { '$regex': req.query.search, '$options': 'i' } },
                    { contactPerson: { '$regex': req.query.search, '$options': 'i' } },
                ]
            })
        }


        const venders = await PublishVenderModel.aggregate(
            [
                {
                    $match: filter?.length ? { $and: filter } : {}
                },

                {
                    $lookup: {
                        from: "categories",
                        as: "categories",
                        let: { "categories": "$categories" },
                        pipeline: [
                            {
                                "$match": {
                                    "$expr": {
                                        "$in":
                                            ["$_id", "$$categories"]
                                    }
                                }
                            },

                        ]
                    }
                },

                {
                    $lookup: {
                        from: "rattings",
                        as: "review",
                        "let": { "venderId": "$_id" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": {
                                        "$eq":
                                            ["$venderId", "$$venderId"]
                                    }
                                }
                            },
                            {
                                $facet: {
                                    rating: [
                                        {
                                            $group: { _id: null, rate: { $avg: "$rate" }, reviews: { $sum: 1 } }
                                        },
                                    ],
                                    badges: [

                                        {
                                            $unwind:
                                            {
                                                path: "$badges",
                                                preserveNullAndEmptyArrays: true
                                            }
                                        },

                                        {
                                            $group: { _id: "$badges", count: { $sum: 1 }, }
                                        },
                                    ]
                                }
                            },
                            {
                                $unwind:
                                {
                                    path: "$rating",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                        ]
                    }
                },
                {
                    $lookup: {
                        from: "anonymous",
                        as: "screen",
                        "let": { "venderId": "$_id" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": {
                                        "$in": [
                                            "$$venderId",
                                            { $ifNull: ['$viewVender', []] }
                                        ]
                                    }
                                }
                            },
                            {
                                $group: { _id: null, views: { $sum: 1 } }
                            }
                        ]
                    }
                },
                {
                    $unwind:
                    {
                        path: "$review",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind:
                    {
                        path: "$screen",
                        preserveNullAndEmptyArrays: true
                    }
                },
                ...(rating ? [{
                    $match: { "review.rating.rate": rating }
                }] : [])
            ]
        ).paginateExec(req.query)

        if (!venders) {
            return res.status(404).json({ message: "venders not exist" })
        }
        if (query?.slug && venders?.docs[0]) {
            await vendersViewsUpdate(req, venders.docs[0]._id);
        }

        return res.json({
            message: "Vender",
            result: venders
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


export const deleteVender = async (req, res, next) => {
    try {
        const vendor = await VenderModel.findById(req.params.id)
        const vender = await VenderModel.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date(), email: `${vendor.email}.deleted`
        });
        if (!vender) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        addActivity("vender", "delete", vender._id)

        return res.status(200).json({
            message: "Vender Delete Seccessfuly",
            result: vender
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


export const venderDetailList = async (req, res, next) => {

    try {
        const venderDetail = await VenderModel.findOne({ _id: req.params.id }).populate([
            {
                path: "categories"
            },
           
            {
                path: "publishVender",
                populate: {
                    path: "categories"
                },
            }
        ])
        return res.status(200).json({
            success: true,
            message: 'Vender Detail List',
            result: venderDetail
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



export const venderUpdate = async (req, res, next) => {
    try {
    
        const vender = await VenderModel.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }

        )
        await sendEmailToVender("updateProfileToVender", vender)
        await sandEmailToAdmin("venderRequestUpdate", vender)
        addActivity("vender", "update", vender._id)

        return res.status(200).json({
            message: "vender updated Seccessfuly",
            result: vender,
            alert: alertToVender("updateDetails")
        })
    } catch (err) {
        return res.status(500).json({
            error: {
                message: err.message,
                error: err
            }
        })
    }
}




export const updateVenderStatus = async (req, res, next) => {
    try {
        const {
            venderId,
            status
        } = req.body;
        console.log("profileStage", req.body.status)


        const vender = await VenderModel.findByIdAndUpdate(venderId, {
            profileStage: status, alertNote: aleartNote(status)

        }, { new: true })

        // await sendEmailToVender("vendorPublish", vender)


        return res.status(200).json({
            message: "status updated Seccessfuly",
            result: vender
        })
    } catch (err) {
        return res.status(500).json({
            error: {
                message: err.message,
                error: err
            }
        })
    }
}



export const replyVenderById = async (req, res, next) => {
    console.log("req", req.body)

    try {
        const reply = await VenderModel.findByIdAndUpdate(req.params.id, {
            $push: {
                replies: {
                    $each: [{
                        reply: req.body.reply
                    }],
                    $position: 0
                }
            }
        });
        sendEmailToUser("replyToUser", { ...req.body, email: reply.email })

        return res.status(200).json({
            message: "Reply",
            result: reply
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}
