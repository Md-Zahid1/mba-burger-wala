import express from "express"
import { createStaticksFiles } from "../controllers/staticksFiles.controller.js"
import { upload } from "../middlewares/staticksFiles.js"


const router = express.Router()
router.post("/createStaticksFiles", upload, createStaticksFiles)

export default router