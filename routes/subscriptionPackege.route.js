import express from 'express'
import { createSubscriptionPackege, deleteSubscriptionPackege, getSubscriptionPackege, subscriptionPackegeDetail, updateSubscriptionPackege } from '../controllers/subscriptionPackege.controller.js'

const router = express.Router()

router.post("/create-subscription-packege", createSubscriptionPackege)
router.post('/update-subscription-packege/:id', updateSubscriptionPackege)
router.get("/list-subscription-packege", getSubscriptionPackege)
router.get('/subscription-packege-detail/:id', subscriptionPackegeDetail)
router.delete('/delete-subscription-packege/:id', deleteSubscriptionPackege)

export default router