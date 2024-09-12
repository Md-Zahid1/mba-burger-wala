import { SupportModal } from "../models/supportModal.js";
import { addActivity } from "../services/activity.js";
import { alertToUser } from "../services/alerts/alertToUser.js";
import { sandEmailToAdmin } from "../services/email/adminEmail.js";
import { sendEmailToUser } from "../services/email/userEmail.js";

export const createSupport = async (req, res, next) => {
    try {
        const support = await SupportModal.create(req.body)
        await sandEmailToAdmin("supportQueryMailToAdmin")
        addActivity("support", "create", support._id)


        return res.status(201).json({
            message: 'Support Created Successfully',
            result: support,
            alert: alertToUser("contactUs")
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


export const getSupport = async (req, res, next) => {

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
                    { email: { '$regex': req.query.search, '$options': 'i' } },
                ]
            })
        }
        const support = await SupportModal.paginate(filter.length ? { $and: filter } : {}, req.query)
        if (!support) {
            return res.status(404).json({ message: "support not exist!" });
        }
        // res.json(support);
        return res.status(200).json({
            message: "Support",
            result: support
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



export const supportDetail = async (req, res, next) => {

    try {
        const support = await SupportModal.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: 'Support Detail',
            result: support
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}



export const updateSupportById = async (req, res, next) => {
    try {
        const support = await SupportModal.findByIdAndUpdate(req.params.id, req.body)
        addActivity("support", "update", support._id)

        return res.status(200).json({
            message: "Support Updated Seccessfully",
            result: support
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



export const deleteSupportById = async (req, res, next) => {
    try {
        const support = await SupportModal.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date()
        });
        console.log("support", support)
        if (!support) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        addActivity("support", "delete", support._id)

        return res.status(200).json({
            message: "Support Delete Successfully",
            result: support
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



export const replySupportById = async (req, res, next) => {
    console.log("req", req.body)

    try {
        const reply = await SupportModal.findByIdAndUpdate(req.params.id, {
            $push: {
                replies: {
                    $each: [{
                        reply: req.body.reply
                    }],
                    $position: 0
                }
            }
        });
        sendEmailToUser("replyToUser", { ...req.body, email: reply.email })

        return res.status(200).json({
            message: "Reply",
            result: reply
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}