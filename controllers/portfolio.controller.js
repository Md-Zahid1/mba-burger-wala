import { PortfolioModal } from "../models/PortfolioModal.js";
import { addActivity } from "../services/activity.js";


export const createPortfolio = async (req, res, next) => {
    try {

        const portfolio = await PortfolioModal.create(req.body)
        addActivity("portfolio", "create", portfolio._id)

        return res.status(201).json({
            message: 'Portfolio Created Successfully',
            result: portfolio
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



export const getPortfolioList = async (req, res, next) => {

    try {
        console.log('req.body', req.query)
        const filter = [{ deletedAt: { $exists: false } }];
        if (req.query.filter) {
            filter.push(req.query.filter)
        }
        if (req.query.search) {
            filter.push({
                $or: [
                    { name: { '$regex': req.query.search, '$options': 'i' } },
                ]
            })
        }
        // const portfolio = await PortfolioModal.paginate(filter.length ? { $and: filter } : {}, req.query)
        const portfolio = await PortfolioModal.paginate(filter.length ? { $and: filter } : {}, { ...req.query, populate: "venderId" })
        if (!portfolio) {
            return res.status(404).json({ message: "portfolio not exist!" });
        }
        return res.status(200).json({
            message: "Portfolio",
            result: portfolio 
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
export const getPortfolio = async (req, res, next) => {

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
        const portfolio = await PortfolioModal.paginate(filter.length ? { $and: filter } : {}, req.query)
        if (!portfolio) {
            return res.status(404).json({ message: "portfolio not exist!" });
        }
        return res.status(200).json({
            message: "Portfolio",
            result: portfolio
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


export const portfolioDetail = async (req, res, next) => {

    try {
        const portfolio = await PortfolioModal.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: 'Portfolio Detail',
            result: portfolio
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}



export const updatePortfolioById = async (req, res, next) => {
    try {
        const portfolio = await PortfolioModal.findByIdAndUpdate(req.params.id, req.body, { new: true })
        addActivity("portfolio", "update", portfolio._id)

        return res.status(200).json({
            message: "Portfolio Updated Seccessfuly",
            result: portfolio
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}



export const deletePortfolioById = async (req, res, next) => {
    try {
        const portfolio = await PortfolioModal.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date()
        });
        if (!portfolio) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        addActivity("portfolio", "delete", portfolio._id)

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
export const migratePortfolioById = async (req, res, next) => {
    try {
        const portfolio = await PortfolioModal.find();

        if (!portfolio) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        portfolio.forEach(async p => {

            const portfo = await PortfolioModal.findByIdAndUpdate(p._id, { type: "image", isPublished: true, venderId: "65d22b537ca7b8791d16e9f9" });
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