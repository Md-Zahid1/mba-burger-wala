import { DestinationLikeModal } from "../models/DestinationLikeModal.js";
import parseObject from "../utils/queryType.js";


export const createDestinationLike = async (req, res, next) => {
    try {
        const {
            userId,
            like,
            venderId,
        } = req.body;

        const createDestinationLike = {
            userId,
            like,
            venderId,
        }

        const destinationLike = await DestinationLikeModal.create(createDestinationLike)

        return res.status(201).json({
            message: 'destinationLike Created Successfully',
            result: destinationLike
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



export const getDestinationLike = async (req, res, next) => {

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
        const destinationLike = await DestinationLikeModal.paginate(
            filter.length ? { $and: filter } : {}, req.query)
        if (!destinationLike) {
            return res.status(404).json({ message: "destinationLike not exist!" });
        }
        return res.status(200).json({
            message: "DestinationLike",
            result: destinationLike
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


export const deleteDestinationLike = async (req, res, next) => {
    try {
        const destinationLike = await DestinationLikeModal.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date()
        });
        if (!deleteDestinationLike) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        return res.status(200).json({
            message: "DestinationLike Delete Successfully",
            result: destinationLike
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}



export const destinationLike = async (req, res, next) => {
    try {

        let query = parseObject(req.query.filter)

        console.log("rest", query)
        const filter = [];
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

        const destinationLikeData = await DestinationLikeModal.aggregate(
            [

                {
                    $match: filter?.length ? { $and: filter } : {}
                },

                {
                    $lookup: {
                        from: "destinationlikes",
                        as: "likes",
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
                                $group: { _id: null, like: { $sum: 1 } }
                            }
                        ]
                    }
                },
                {
                    $unwind:
                    {
                        path: "$likes",
                        preserveNullAndEmptyArrays: true
                    }
                },
            ]
        ).paginateExec(req.query)
        if (!destinationLikeData) {
            return res.status(404).json({ message: "destinationLike not exist" })
        }
        return res.status(200).json({
            message: "DestinationLike",
            result: destinationLikeData
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