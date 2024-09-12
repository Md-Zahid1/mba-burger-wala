import express from 'express'
import { dashboard } from '../controllers/dadhboard.controller.js'


const router = express.Router()

router.get("/dashboard/:id?", dashboard) 

export default router