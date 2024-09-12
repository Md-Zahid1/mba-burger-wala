import { DestinationModal } from "../models/DestinationModal.js";
import { addActivity } from "../services/activity.js";
import parseObject from "../utils/queryType.js";

export const createDestination = async (req, res, next) => {
    try {

        const destination = await DestinationModal.create(req.body)
        addActivity("destination", "create", destination._id)

        return res.status(201).json({
            message: 'Destination created successfully',
            result: destination
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}


export const getDestination = async (req, res, next) => {

    try {
        let query = parseObject(req.query.filter)

        console.log("rest", query)
        const filter = [{ isPublished: true }, { deletedAt: { $exists: false } }];
        if (query) {
            filter.push(query)
        }
        if (req.query.search) {
            filter.push({
                $or: [
                    { title: { '$regex': req.query.search, '$options': 'i' } },
                    { subTitle: { '$regex': req.query.search, '$options': 'i' } },
                ]
            })
        }

        const destinationLikeData = await DestinationModal.aggregate(
            [

                {
                    $match: filter?.length ? { $and: filter } : {}
                },

                {
                    $lookup: {
                        from: "users",
                        as: "like",
                        "let": { "venderId": "$_id" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": {
                                        "$in": [
                                            "$$venderId",
                                            { $ifNull: ['$likeDestination', []] }
                                        ]
                                    }
                                }
                            },
                            {
                                $group: { _id: null, likes: { $sum: 1 } }
                            }
                        ]
                    }
                },
                {
                    $unwind:
                    {
                        path: "$like",
                        preserveNullAndEmptyArrays: true
                    }
                },
            ]
        ).paginateExec(req.query)


        return res.status(200).json({
            message: "Destination",
            result: destinationLikeData
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}


export const getDestinationList = async (req, res, next) => {

    try {
        let query = parseObject(req.query.filter)

        console.log("rest", query)
        const filter = [{ deletedAt: { $exists: false } }];
        if (query) {
            filter.push(query)
        }
        if (req.query.search) {
            filter.push({
                $or: [
                    { title: { '$regex': req.query.search, '$options': 'i' } },
                    { subTitle: { '$regex': req.query.search, '$options': 'i' } },
                ]
            })
        }

        const destinationLikeData = await DestinationModal.aggregate(
            [

                {
                    $match: filter?.length ? { $and: filter } : {}
                },

                {
                    $lookup: {
                        from: "users",
                        as: "like",
                        "let": { "venderId": "$_id" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": {
                                        "$in": [
                                            "$$venderId",
                                            { $ifNull: ['$likeDestination', []] }
                                        ]
                                    }
                                }
                            },
                            {
                                $group: { _id: null, likes: { $sum: 1 } }
                            }
                        ]
                    }
                },
                {
                    $unwind:
                    {
                        path: "$like",
                        preserveNullAndEmptyArrays: true
                    }
                },
            ]
        ).paginateExec(req.query)


        return res.status(200).json({
            message: "Destination",
            result: destinationLikeData
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}



export const detailDestination = async (req, res, next) => {

    try {
        const destination = await DestinationModal.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: 'Destination Detail',
            result: destination
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}


export const updateDestinationById = async (req, res, next) => {
    try {
        const destination = await DestinationModal.findByIdAndUpdate(req.params.id, req.body, { new: true })
        addActivity("destination", "update", destination._id)

        return res.status(200).json({
            message: "Destination updated Seccessfuly",
            result: destination
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const deleteDestinationById = async (req, res, next) => {
    try {
        const destination = await DestinationModal.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date()
        });
        if (!destination) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        addActivity("destination", "delete", destination._id)

        return res.status(200).json({
            message: "Destination Delete Successfully",
            result: destination
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}

export const migrateDestinationById = async (req, res, next) => {
    try {
        const portfolio = await DestinationModal.find();

        if (!portfolio) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        portfolio.forEach(async p => {

            const portfo = await DestinationModal.findByIdAndUpdate(p._id, { placeDetails: p.extraDetails, isPublished: true, new: true });
            console.log("portfolio", portfo);

        })
        return res.status(200).json({
            message: "Portfolio Delete Successfully",
            result: portfolio
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}