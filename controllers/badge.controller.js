import { BadgeModal } from "../models/BadgeModal.js";


export const createBadge = async (req, res, next) => {
    try {
        const {
            userId,
            badge,
            venderId,
        } = req.body;

        const createBadge = {
            userId,
            badge,
            venderId
        }

        const data = await BadgeModal.create(createBadge)

        return res.status(201).json({
            message: 'Badge Created successfully',
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



export const getBadge = async (req, res, next) => {

    try {
        console.log('req.body', req.query)
        const filter = [];
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
        const badge = await BadgeModal.paginate(filter.length ? { $and: filter } : {}, req.query)
        if (!badge) {
            return res.status(404).json({ message: "badge not exist!" });
        }
        return res.status(200).json({
            message: "Badge",
            result: badge
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


export const deleteBadge = async (req, res, next) => {
    try {
        const badge = await BadgeModal.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date()
        });
        if (!badge) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        return res.status(200).json({
            message: "Badge Delete Successfully",
            result: badge
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}



export const badge = async (req, res, next) => {
    try {
        const badge = await BadgeModal.aggregate(
            [
                {
                    $lookup: {
                        from: "rattings",
                        as: "ratting",
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
                                $group: { _id: null, rate: { $avg: "$rate" } }
                            }
                        ]
                    }
                },
                {
                    $unwind:
                    {
                        path: "$ratting",
                        preserveNullAndEmptyArrays: true
                    }
                },
            ]
        ).paginateExec(req.query)
        if (!badge) {
            return res.status(404).json({ message: "badge not exist" })
        }
        // res.json(badge)
        return res.status(200).json({
            message: "Badge",
            result: badge
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