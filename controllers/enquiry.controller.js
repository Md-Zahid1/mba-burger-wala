import { EnquiryModal } from "../models/EnquiryModal.js";
import { VenderModel } from "../models/VenderModel.js";
import { addActivity } from "../services/activity.js";
import { alertToUser } from "../services/alerts/alertToUser.js";
import { sendEmailToUser } from "../services/email/userEmail.js";
import { sendEmailToVender } from "../services/email/venderEmail.js";
import { filterVenders } from "../services/venderService.js";
import parseObject from "../utils/queryType.js";

export const createEnquiry = async (req, res, next) => {
    try {

        const enquiry = await EnquiryModal.create(req.body)

        if (req.body.venderId) {
            const vender = await VenderModel.findById(req.body.venderId)
            await sendEmailToVender("enquiryToVender", vender, { enquiry })

        } else {
            const venders = await filterVenders({
                sort: { rating: "desc" },
                limit: 5,
                filter: {
                    minPrice: { $lte: req.body.budget },
                    selectService: req.body.service,
                },
            })
            console.log("venders", venders)

            await sendEmailToUser("enquiryVenderListToUser", enquiry, { venders })
        }
        addActivity("enquiry", "create", enquiry._id)


        return res.status(201).json({
            message: 'Enquiry Created Successfully',
            result: enquiry,
            alert: req.body.venderId ? alertToUser("submitQuerySpecific") : alertToUser("submitQueryGeneral")
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



export const getEnquiry = async (req, res, next) => {

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
                    { email: { '$regex': req.query.search, '$options': 'i' } }
                ]
            })
        }
        console.log("filter", filter)
        const enquiry = await EnquiryModal.paginate(filter.length ? { $and: filter } : {}, req.query)
        if (!enquiry) {
            return res.status(404).json({ message: "enquiry not exist!" });
        }
        // res.json(enquiry);
        return res.status(200).json({
            message: "Enquiry",
            result: enquiry
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



export const enquiryDetail = async (req, res, next) => {
    try {
        const enquiry = await EnquiryModal.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: 'Enquiry Detail',
            result: enquiry
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}



export const updateEnquiryById = async (req, res, next) => {
    try {
        const enquiry = await EnquiryModal.findByIdAndUpdate(req.params.id, req.body)
        addActivity("enquiry", "update", enquiry._id)

        return res.status(200).json({
            message: "Enquiry updated Successfuly",
            result: enquiry
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}



export const deleteEnquiryById = async (req, res, next) => {
    try {
        const enquiry = await EnquiryModal.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date()
        });
        if (!enquiry) {
            return res.status(404).json({ message: "Nothing to delete" });
        }
        addActivity("enquiry", "delete", enquiry._id)

        return res.status(200).json({
            message: "Enquiry Delete Successfully",
            result: enquiry
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}



export const replyEnquiryById = async (req, res, next) => {
    console.log("req", req.body)

    try {
        const reply = await EnquiryModal.findByIdAndUpdate(req.params.id, {
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