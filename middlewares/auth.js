import { UserModel } from "../models/UserModel.js"
import requestIp from 'request-ip';


export const isAuthenticated = (req, res, next) => {
    const clientIp = requestIp.getClientIp(req);
    console.log("clientIp", clientIp)
    if (req.headers?.userid || req.session?.userId) {
        // if (!req.session.userId) {
        req.userId = req.session?.userId || req.headers?.userid;
        return next()
    }
    return res.status(401).json({ massege: "Not Authorize" })
}


export const authorizeAdmin = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(405).json({ message: "You are not login" })
    }

    const user = await UserModel.findById(req.session.userId)
    req.userId = req.headers.userid || req.session.userId;

    if (user.role !== "admin") {
        return res.status(405).json({ massege: "Only Admin Allowed" })
    }
    next()
}