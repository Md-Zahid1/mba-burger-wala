import express from 'express'
import { createBadge, deleteBadge, getBadge, badge } from '../controllers/badge.controller.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.post("/create-badge", isAuthenticated, createBadge)
router.get("/list-badge", isAuthenticated, getBadge)
router.get('/badge', badge)
router.delete('/delete-badge/:id', isAuthenticated, deleteBadge)

export default router