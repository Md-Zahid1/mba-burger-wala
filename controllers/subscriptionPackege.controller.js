import { SubscriptionPackegeModel } from "../models/SubscriptonPackegeModel.js";
import { addActivity } from "../services/activity.js";


export const createSubscriptionPackege = async (req, res, next) => {
    try {
        const data = await SubscriptionPackegeModel.create(req.body)
        // addActivity("metroCity", "create", data._id)

        return res.status(201).json({
            message: 'SubscriptionPackege Created successfully',
            result: data
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



export const getSubscriptionPackege = async (req, res, next) => {

    try {
        console.log('req.body', req.query)
        const filter = [{ deletedAt: { $exists: false } }];
        if (req.query.filter) {
            filter.push(req.query.filter)
        }
        if (req.query.search) {
            filter.push({
                $or: [
                    { onbodingFee: { '$regex': req.query.search, '$options': 'i' } },
                    { registrationFee: { '$regex': req.query.search, '$options': 'i' } },
                ]
            })
        }
        const subscriptionPackege = await SubscriptionPackegeModel.paginate(filter.length ? { $and: filter } : {}, req.query)
        if (!subscriptionPackege) {
            return res.status(404).json({ message: "SubscriptionPackege not exist!" });
        }
        return res.status(200).json({
            message: "SubscriptionPackege",
            result: subscriptionPackege
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


export const subscriptionPackegeDetail = async (req, res, next) => {

    try {
        const subscriptionPackege = await SubscriptionPackegeModel.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: 'SubscriptionPackege Detail',
            result: subscriptionPackege
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}


export const updateSubscriptionPackege = async (req, res, next) => {
    try {
        const subscriptionPackege = await SubscriptionPackegeModel.findByIdAndUpdate(req.params.id, req.body)
        // addActivity("metroCity", "update", metroCity._id)

        return res.status(200).json({
            message: "SubscriptionPackege updated Seccessfuly",
            result: subscriptionPackege
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


export const deleteSubscriptionPackege = async (req, res, next) => {
    try {
        const subscriptionPackege = await SubscriptionPackegeModel.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date()
        });
        if (!subscriptionPackege) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        // addActivity("metroCity", "delete", metroCity._id)

        return res.status(200).json({
            message: "SubscriptionPackege Delete Successfully",
            result: subscriptionPackege
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}