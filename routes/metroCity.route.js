import express from 'express'
import { createMetroCity, deleteMetroCity, getMetroCity, metroCity, metroCityDetail, updateMetroCity } from '../controllers/metroCity.controller.js'

const router = express.Router()

router.post("/create-metroCity", createMetroCity)
router.post('/update-metroCity/:id', updateMetroCity)
router.get("/list-metroCity", getMetroCity)
router.get('/metroCity-detail/:id', metroCityDetail)
router.get('/metroCity', metroCity)
router.delete('/delete-metroCity/:id', deleteMetroCity)

export default router