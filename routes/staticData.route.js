import express from "express"
import { createStaticData, deleteStaticData, getStaticData, updateStaticData } from "../controllers/staticData.controller.js"

const router = express.Router()

router.post("/create-static_data", createStaticData)
router.get("/list-static_data", getStaticData)
router.post("/update-static_data", updateStaticData)
router.delete("/delete-static_data", deleteStaticData)

export default router