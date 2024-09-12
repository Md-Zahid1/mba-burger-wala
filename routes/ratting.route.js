import express from 'express'
import { createRatting, deleteRatting, getRatting, rattingDetail, rattings, updateRattingById } from '../controllers/ratting.controller.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.post("/create-ratting", isAuthenticated, createRatting)
router.get("/list-ratting", getRatting)
router.get('/ratting-info/:id', rattingDetail) 
router.post('/update-ratting/:id', updateRattingById)
router.get('/rattings', rattings)
router.delete('/delete-ratting/:id', isAuthenticated, deleteRatting)

export default router  