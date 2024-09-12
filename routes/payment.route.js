import express from "express"
import { order, paymentCapture } from "../controllers/payment.controller.js"
import { isAuthenticated } from "../middlewares/auth.js"


const router = express.Router()

router.post("/order", isAuthenticated, order)
router.post("/paymentCapture", paymentCapture)
// router.post("/refund", refund)
// router.post("/payment", payment)

export default router