import { FAQModal } from "../models/FAQModal.js";


export const createFaq = async (req, res, next) => {
    try {
        const {
            question,
            answer,
        } = req.body;

        const createFaq = {
            question,
            answer,
        }

        const faq = await FAQModal.create(createFaq)

        return res.status(201).json({
            message: "Faq Create successfully",
            result: faq
        })

    } catch (err) {
        console.log("err", err)
        return res.status(500).json({
            error: {
                message: err.message,
                error: err
            }
        })
    }
}


export const getFaq = async (req, res, next) => {

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
        const faq = await FAQModal.paginate(filter.length ? { $and: filter } : {}, req.query)
        if (!faq) {
            return res.status(404).json({ message: "faq not exist!" });
        }
        return res.status(200).json({
            message: "Faq",
            result: faq
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


export const faqDetail = async (req, res, next) => {

    try {
        const faq = await FAQModal.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: 'Faq Detail',
            result: faq
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}


export const updateFaqById = async (req, res, next) => {
    try {
        const {
            question,
            answer
        } = req.body;

        const updateFaqById = {
            question,
            answer
        };

        const faq = await FAQModal.findByIdAndUpdate(req.params.id, updateFaqById)

        return res.status(200).json({
            message: "Faq updated Seccessfuly",
            result: faq
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}



export const deleteFaqById = async (req, res, next) => {
    try {
        const faq = await FAQModal.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date()
        });
        if (!faq) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        // res.json(deleteFaqById)
        return res.status(200).json({
            message: "Faq Delete Successfully",
            result: faq
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}