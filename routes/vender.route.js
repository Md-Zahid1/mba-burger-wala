import express from 'express'
import { venderCreate, deleteVender, venderDetailList, venderRegister, venderInfo, venders, venderUpdate, updateVenderStatus, addBusinessProfile, publishVendor, feacherVendor, replyVenderById } from '../controllers/vender.controller.js'
import { imageUploadCont } from '../controllers/uploadDoc.controller.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.post("/vender-register", venderRegister)
router.post("/vender-create", venderCreate)
router.post('/vender-update/:id', isAuthenticated, venderUpdate)
router.post("/vender-addProfile", addBusinessProfile)
router.post('/upload-image', isAuthenticated, imageUploadCont)
router.post("/vender-status", updateVenderStatus)
router.post("/vender-pulish", publishVendor)
router.post("/vender-feacher", feacherVendor)
router.post('/reply-vender/:id', replyVenderById)  


router.get('/vender-list', venderInfo)
router.get("/venders", venders)
router.get('/vender-info/:id', venderDetailList)
router.delete('/deleteVender/:id', isAuthenticated, deleteVender)


export default router