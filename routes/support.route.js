import express from 'express'
import { createSupport, getSupport, supportDetail, updateSupportById, deleteSupportById, replySupportById } from "../controllers/support.controller.js";

const router = express.Router()

router.post("/create-support", createSupport)
router.post("/update-support/:id", updateSupportById)
router.get("/list-support", getSupport)
router.get('/support-detail/:id', supportDetail)
router.delete('/delete-support/:id', deleteSupportById)
router.post('/reply-support/:id', replySupportById)  

export default router