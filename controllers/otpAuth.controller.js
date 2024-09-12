import { UserModel } from "../models/UserModel.js"
import { otpEmail } from "../services/email/otpEmail.js"
import { VenderModel } from "../models/VenderModel.js"
import { saveSession } from "../services/session.js"
import { alertToUser } from "../services/alerts/alertToUser.js"
import { sendEmailToVender } from "../services/email/venderEmail.js"
import { sendEmailToUser } from "../services/email/userEmail.js"
import crypto from "crypto";
import errorHandlers from "../utils/errorHandlers.js"
import { addActivity } from "../services/activity.js"
import NodeCache from "node-cache";
const myCache = new NodeCache();
const casheTtl = 60 * 10

export const otpUserAuth = async (req, res, next) => {
    try {
        const { name, mobile } = req.body
        const email = req.body?.email?.trim()?.toLowerCase()
        console.log("email", email)
        let user = await UserModel.findOne({ email }).populate("venderId");
        if (user && name && mobile) {
            return res.status(409).json({ message: `This Email Allready Exist` })
        }
        if (!user) {
            if (name && mobile) {
                user = {
                    name: name,
                    email: email,
                    mobile,
                }
            } else {
                return res.status(404).json({ message: ` User Not Found"` })
            }
        }
        if (user.profileStatus == "Blocked") {
            return res.status(403).json({
                message: "You Are Blocked Please contact to admin"
            })
        }
        console.log("user", user)

        const otp = crypto.randomInt(100000, 999999);
        console.log("otp", otp)

        const expires = Date.now() + 1000 * 60 * 10;
        const otpHash = `${otp}.${expires}`;
        console.log("expires", expires)
        console.log("otphas", otpHash)

        if (user._id) {
            await UserModel.findByIdAndUpdate(user._id, { otpHash })
        } else {
            myCache.set(`user.${email}`, { ...user, otpHash }, casheTtl)
        }
        await sendEmailToUser("otpToUser", user, { otp })

        return res.status(200).json({
            message: "Otp send Successfully",
            alert: alertToUser("otpSendAlert"),
            data: user.email
        })
    } catch (err) {
        const error = await errorHandlers(err);
        return res.status(error.status).json({
            message: error.message,
            error: error,
        })
    }
}

export const otpVerify = async (req, res, next) => {
    try {
        // const { otp } = req.body
        const otp = req.body.otp?.trim()
        const email = req.body.email?.trim()?.toLowerCase()
        console.log('email, otpHash', email, otp)
        if (!email || !otp) {
            return res.status(404).json({ message: "Wrong otp" })
        }
        let user = await UserModel.findOne({ email }, "+otpHash").populate("venderId")


        let vender
        if (!user) {
            user = myCache.get(`user.${email}`);
            vender = myCache.get(`vender.${email}`);
        }
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        console.log("user", user)
        console.log("vender", vender)


        const [userOtp, expire] = user.otpHash.split('.')
        if (Date.now() > +expire) {
            return res.status(403).json({ message: 'Expire Otp' })
        }
        if (userOtp != otp) {
            return res.status(403).json({ message: "invalid Otp" })
        }
        let nUser
        let nVender
        if (!user._id) {
            if (user.role == "vendor") {
                nVender = await VenderModel.create(vender)
                addActivity("vender", "otpVerify", nVender._id)
            }

            nUser = await UserModel.create({
                ...user, profileStatus: "New",
                ...(user.role == "vendor" ? { venderId: nVender._id } : {})
            })
            addActivity("user", "otpVerify", nUser._id)
        } else {
            [nUser, nVender] = await Promise.all([
                UserModel.findByIdAndUpdate(user._id, {
                    loginAt: new Date(),
                }, { new: true }).populate("venderId"),
                (user.role == "vendor" ?
                    VenderModel.findByIdAndUpdate(user.venderId, {
                        loginAt: new Date(),
                    }, { new: true })
                    : []
                )
            ])
        }
        req.session.userId = user._id;

        await saveSession(req);

        return res.status(200).json({
            message: "Otp Verify Successfully",
            result: nUser
        })
    } catch (err) {
        console.log("errrrr", err);
        const error = await errorHandlers(err);
        return res.status(error.status).json({
            message: error.message,
            error: error,
        })
    }
}


export const venderSignup = async (req, res, next) => {
    try {
        const email = req.body.email?.trim()?.toLowerCase();
        req.body.email = email
        let [vender, user] = await Promise.all([
            VenderModel.findOne({ email }),
            UserModel.findOne({ email })
        ])
        if (vender || user) {
            return res.status(409).json({ message: `Email Allready Exist` })
        }
        console.log('vender', vender)



        const otp = crypto.randomInt(100000, 999999);
        const expires = Date.now() + 1000 * 60 * 10;
        const otpHash = `${otp}.${expires}`;
        myCache.mset(
            [
                {
                    key: `user.${email}`,
                    val: {
                        email,
                        name: req.body.businessName,
                        otpHash,
                        mobile: req.body.mobile,
                        role: "vendor"
                    },
                    ttl: casheTtl
                },
                {
                    key: `vender.${email}`,
                    val: req.body,
                    ttl: casheTtl
                }
            ]
        )
        // const venderData = await UserModel.findByIdAndUpdate(user._id, { otpHash, venderId: vender._id, role: "vendor" })
        await sendEmailToVender("registerVendorOtp", req.body, { otp })
        return res.status(201).json({
            message: "verder created Seccessfuly",
            result: req.body
        })
    } catch (err) {
        const error = await errorHandlers(err);
        return res.status(error.status).json({
            message: error.message,
            error: error,
        })
    }
}