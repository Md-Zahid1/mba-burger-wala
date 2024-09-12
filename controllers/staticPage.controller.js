import { StaticPageModal } from "../models/StaticPageModal.js";
import { addActivity } from "../services/activity.js";


export const createStaticPage = async (req, res, next) => {
    try {
        const staticPage = await StaticPageModal.create(req.body)
        addActivity("staticPage", "create", staticPage._id)


        return res.status(201).json({
            message: "StaticPage Create successfully",
            result: staticPage
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


export const getStaticPageList = async (req, res, next) => {

    try {
        console.log('req.body', req.query)
        const filter = [];
        if (req.query.filter) {
            filter.push(req.query.filter)
        }
        if (req.query.search) {
            filter.push({
                $or: [
                    { name: { '$regex': req.query.search, '$options': 'i' } }
                ]
            })
        }
        const staticPage = await StaticPageModal.paginate(filter.length ? { $and: filter } : {}, req.query)
        if (!staticPage) {
            return res.status(404).json({ message: "staticpage not exist!" });
        }
        return res.status(200).json({
            message: "staticpage",
            result: staticPage
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
export const getStaticPage = async (req, res, next) => {

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
        const staticPage = await StaticPageModal.paginate(filter.length ? { $and: filter } : {}, req.query)
        if (!staticPage) {
            return res.status(404).json({ message: "staticpage not exist!" });
        }
        return res.status(200).json({
            message: "staticpage",
            result: staticPage
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


export const staticPageDetail = async (req, res, next) => {

    try {
        const staticPage = await StaticPageModal.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: 'staticPage Detail',
            result: staticPage
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}


export const updateStaticPageById = async (req, res, next) => {
    try {
        const staticPage = await StaticPageModal.findByIdAndUpdate(req.params.id, req.body)
        addActivity("staticPage", "update", staticPage._id)

        return res.status(200).json({
            message: "StaticPage updated Seccessfuly",
            result: staticPage
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}



export const deleteStaticPageById = async (req, res, next) => {
    try {
        const staticPage = await StaticPageModal.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date()
        });
        if (!staticPage) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        addActivity("staticPage", "delete", staticPage._id)

        return res.status(200).json({
            message: "staticPage Delete Successfully",
            result: staticPage
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}