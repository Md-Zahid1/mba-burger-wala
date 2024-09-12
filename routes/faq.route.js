import express from 'express'
import { createFaq, updateFaqById, deleteFaqById, getFaq, faqDetail } from '../controllers/faq.controller.js'

const router = express.Router()

router.post("/create-faq", createFaq)
router.post("/update-faq/:id", updateFaqById)
router.get("/list-faq", getFaq)
router.get('/faq-detail/:id', faqDetail)
router.delete('/delete-faq/:id', deleteFaqById) 

export default router 