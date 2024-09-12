import { MetroCityModal } from "../models/MetroCityModal.js";
import { addActivity } from "../services/activity.js";


export const createMetroCity = async (req, res, next) => {
    try {
        const data = await MetroCityModal.create(req.body)
        addActivity("metroCity", "create", data._id)

        return res.status(201).json({
            message: 'MetroCity Created successfully',
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



export const getMetroCity = async (req, res, next) => {

    try {
        console.log('req.body', req.query)
        const filter = [{ deletedAt: { $exists: false } }];
        if (req.query.filter) {
            filter.push(req.query.filter)
        }
        if (req.query.search) {
            filter.push({
                $or: [
                    { state: { '$regex': req.query.search, '$options': 'i' } },
                    { city: { '$regex': req.query.search, '$options': 'i' } },
                ]
            })
        }
        const metroCity = await MetroCityModal.paginate(filter.length ? { $and: filter } : {}, req.query)
        if (!metroCity) {
            return res.status(404).json({ message: "MetroCity not exist!" });
        }
        return res.status(200).json({
            message: "MetroCity",
            result: metroCity
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


export const metroCityDetail = async (req, res, next) => {

    try {
        const metroCity = await MetroCityModal.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: 'MetroCity Detail',
            result: metroCity
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}


export const updateMetroCity = async (req, res, next) => {
    try {
        const metroCity = await MetroCityModal.findByIdAndUpdate(req.params.id, req.body)
        addActivity("metroCity", "update", metroCity._id)

        return res.status(200).json({
            message: "MetroCity updated Seccessfuly",
            result: metroCity
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


export const deleteMetroCity = async (req, res, next) => {
    try {
        const metroCity = await MetroCityModal.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date()
        });
        if (!metroCity) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        addActivity("metroCity", "delete", metroCity._id)

        return res.status(200).json({
            message: "MetroCity Delete Successfully",
            result: metroCity
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}



export const metroCity = async (req, res, next) => {
    try {
        const metroCity = await MetroCityModal.aggregate(
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
        if (!metroCity) {
            return res.status(404).json({ message: "metroCity not exist" })
        }

        return res.status(200).json({
            message: "MetroCity",
            result: metroCity
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