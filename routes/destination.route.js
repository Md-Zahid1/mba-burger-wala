import express from 'express'
import { createDestination, deleteDestinationById, getDestination, detailDestination, updateDestinationById, getDestinationList, migrateDestinationById } from "../controllers/destination.controller.js"
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.post("/create-destination", isAuthenticated, createDestination)
router.post("/update-destination/:id", isAuthenticated, updateDestinationById)
router.get("/list-destination", getDestinationList)
router.get("/destinations", getDestination)
router.get("/detail-destination/:id", detailDestination)
router.delete('/delete-destination/:id', isAuthenticated, deleteDestinationById)
router.post('/migrat-destination', migrateDestinationById)
export default router   