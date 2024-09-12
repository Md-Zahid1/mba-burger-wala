import { ActivityModal } from "../models/ActivityModal.js";
import parseObject from "../utils/queryType.js";


export const createActivity = async (req, res, next) => {
    try {
        const {
            userId,
            message,
            action,
            note,
            description,
            venderId
        } = req.body;

        const createActivity = {
            userId,
            message,
            action,
            note,
            description,
            venderId
        }

        const data = await ActivityModal.create(createActivity)

        return res.status(201).json({
            message: 'Activity Created Successfully',
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

export const createShared = async (req, res, next) => {
    try {
        const {
            userId,
            message,
            shared,
            venderId
        } = req.body;

        const createShared = {
            userId,
            message: `Your Profile Shared On ${shared}`,
            action: "SHARED PROFILE",
            venderId
        }

        const data = await ActivityModal.create(createShared)

        return res.status(201).json({
            message: 'Shared Created successfully',
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

export const getActivity = async (req, res, next) => {

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
                    { actionOn: { '$regex': req.query.search, '$options': 'i' } },
                    { action: { '$regex': req.query.search, '$options': 'i' } },
                    { message: { '$regex': req.query.search, '$options': 'i' } },
                ]
            })
        }
        const activity = await ActivityModal.paginate(
            filter.length ? { $and: filter } : {}, {
            ...req.query, populate: [
                {
                    path: "userId",
                    select: "name email"
                },
                {
                    path: "venderId",
                    select: "businessName email businessBanner "
                },
                { path: "categoryId" },
                { path: "destinationId" },
                { path: "enquiryId" },
                { path: "metroCityId" },
                { path: "portfolioId" },
                { path: "rattingId" },
                { path: "staticPageId" },
                { path: "supportId" }
            ]
        }
        )

        if (!activity) {
            return res.status(404).json({ message: "activity not exist!" });
        }
        return res.status(200).json({
            message: "Activity",
            result: activity
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


export const deleteActivity = async (req, res, next) => {
    try {
        const activity = await ActivityModal.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date()
        });
        if (!activity) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        return res.status(200).json({
            message: "Activity Delete Successfully",
            result: activity
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}


export const activityDetail = async (req, res, next) => {

    try {
        const activity = await ActivityModal.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: "Activity Detail",
            result: activity
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}

