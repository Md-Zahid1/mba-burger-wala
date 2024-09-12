import express from 'express'
import { createStaticPage, deleteStaticPageById, getStaticPage, getStaticPageList, staticPageDetail, updateStaticPageById } from '../controllers/staticPage.controller.js'

const router = express.Router()

router.post("/create-staticpage", createStaticPage)
router.post("/update-staticpage/:id", updateStaticPageById)
router.get("/list-staticpage", getStaticPageList)
router.get("/staticpages", getStaticPage)
router.get('/staticpage-detail/:id', staticPageDetail)
router.delete('/delete-staticpage/:id', deleteStaticPageById)

export default router 