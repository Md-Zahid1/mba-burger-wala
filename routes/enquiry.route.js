import express from "express"
import { createEnquiry, updateEnquiryById, deleteEnquiryById, enquiryDetail, getEnquiry, replyEnquiryById } from "../controllers/enquiry.controller.js"

const router = express.Router()

router.post("/create-enquiry", createEnquiry)
router.post("/update-enquiry/:id", updateEnquiryById)
router.get("/list-enquiry", getEnquiry)
router.get("/enquiry-detail/:id", enquiryDetail)
router.delete('/delete-enquiry/:id', deleteEnquiryById)
router.post('/reply-enquiry/:id', replyEnquiryById)
 

export default router 