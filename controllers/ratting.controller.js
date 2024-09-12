import { RattingModal } from "../models/RattingModal.js";
import { addActivity } from "../services/activity.js";
import { alertToUser } from "../services/alerts/alertToUser.js";
import parseObject from "../utils/queryType.js";


export const createRatting = async (req, res, next) => {
    try {
        const ratting = await RattingModal.create(req.body)
        addActivity("rating", "create", ratting._id)

        return res.status(201).json({
            message: 'Ratting Created Successfully',
            result: ratting,
            alert: alertToUser("reviewFeedback")
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



export const getRatting = async (req, res, next) => {

    try {
        console.log('req.body', req.query)
        const query = parseObject(req.query.filter)
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
        const ratting = await RattingModal.paginate(
            filter.length ? { $and: filter } : {}, {
            ...req.query, populate: [
                {
                    path: "userId",
                    select: "name email"
                },
                { path: "venderId", select: "businessName email businessBanner " }]
        })
        if (!ratting) {
            return res.status(404).json({ message: "ratting not exist!" });
        }
        return res.status(200).json({
            message: "Ratting",
            result: ratting
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


export const deleteRatting = async (req, res, next) => {
    try {
        const ratting = await RattingModal.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date()
        });
        if (!ratting) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        addActivity("rating", "delete", ratting._id)

        return res.status(200).json({
            message: "Ratting Delete Successfully",
            result: ratting
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}



export const rattings = async (req, res, next) => {
    try {
        console.log('req.body', req.query)
        const filter = [{ isPublished: true }, { deletedAt: { $exists: false } }];
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
        const ratting = await RattingModal.paginate(
            filter.length ? { $and: filter } : {}, {
            ...req.query, populate: [
                {
                    path: "userId",
                    select: "avatar name email"
                },
                { path: "venderId", select: "businessName email businessBanner " }]
        })
        if (!ratting) {
            return res.status(404).json({ message: "ratting not exist!" });
        }
        return res.status(200).json({
            message: "Ratting",
            result: ratting
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

export const rattingDetail = async (req, res, next) => {

    try {
        const ratting = await RattingModal.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: "ratting Detail",
            result: ratting
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}



export const updateRattingById = async (req, res, next) => {
    try {
        const ratting = await RattingModal.findByIdAndUpdate(req.params.id, req.body, { new: true })

        addActivity("rating", "update", ratting._id)

        return res.status(200).json({
            message: "Ratting updated Seccessfuly",
            result: ratting
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}