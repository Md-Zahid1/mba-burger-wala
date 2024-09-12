import { CategoryModel } from "../models/CategoryModal.js";
import { addActivity } from "../services/activity.js";
import parseObject from "../utils/queryType.js";

export const category = async (req, res, next) => {

    try {
        const category = await CategoryModel.create(req.body)
        addActivity("category", "create", category._id)

        return res.status(201).json({
            message: "Category Created Seccessfuly",
            result: category
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}


export const getCategory = async (req, res, next) => {

    try {
        console.log('req.body', req.query)
        const query = parseObject(req.query.filter)
        const filter = [{ deletedAt: { $exists: false } }];
        if (req.query.filter) {
            filter.push(query)
        }
        if (req.query.search) {
            filter.push({
                $or: [
                    { name: { '$regex': req.query.search, '$options': 'i' } }
                ]
            })
        }
        console.log("filter", filter)
        const category = await CategoryModel.paginate(filter.length ? { $and: filter } : {}, req.query)
        if (!category) {
            return res.status(404).json({ message: "category not exist!" });
        }
        return res.status(200).json({
            message: "Category",
            result: category
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}
export const getCategories = async (req, res, next) => {

    try {
        const category = await CategoryModel.paginate({ isPublished: true, deletedAt: { $exists: false } }, req.query)
        if (!category) {
            return res.status(404).json({ message: "category not exist!" });
        }
        return res.status(200).json({
            message: "Category",
            result: category
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}



export const categoryDetail = async (req, res, next) => {

    try {
        const category = await CategoryModel.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: "Category Detail",
            result: category
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}


export const deleteCategoryById = async (req, res, next) => {
    try {
        const category = await CategoryModel.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date()
        });
        if (!category) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        addActivity("category", "delete", category._id)
        return res.status(200).json({
            message: "Category Delete Successfully",
            result: category
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}


export const updateCategoryById = async (req, res, next) => {
    try {
        const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body)
        addActivity("category", "update", category._id)

        return res.status(200).json({
            message: "Category updated Seccessfuly",
            result: category
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}