import express from 'express'
import { activityDetail, createActivity, createShared, deleteActivity, getActivity } from '../controllers/activity.controller.js'


const router = express.Router()

router.post("/create-activity", createActivity)
router.get("/list-activity", getActivity)
router.delete('/delete-activity/:id', deleteActivity)
router.get('/activity-info/:id', activityDetail)
router.post("/create-shared", createShared)

export default router 