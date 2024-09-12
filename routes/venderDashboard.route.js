import express from 'express'
import { vendorDashboard } from '../controllers/venderDashboard.controller.js'


const router = express.Router()

router.get("/vendor-dashboard/:id?", vendorDashboard)

export default router  