import express from 'express'
import { createDestinationLike, deleteDestinationLike, destinationLike, getDestinationLike } from '../controllers/destinationLike.controller.js'


const router = express.Router()

router.post("/create-destinationLike", createDestinationLike)
router.get("/list-destinationLike", getDestinationLike)
router.get('/destinationLike', destinationLike)
router.delete('/delete-destinationLike/:id', deleteDestinationLike)

export default router  