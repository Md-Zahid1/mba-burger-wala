import express from "express"
import {  otpUserAuth, otpVerify, venderSignup } from "../controllers/otpAuth.controller.js"

const router = express.Router()
router.post('/otp-auth', otpUserAuth)
router.post('/vender-signup', venderSignup)

router.post('/otp-verify', otpVerify)


export default router