import { DestinationModal } from "../models/DestinationModal.js";
import { PublishVenderModel } from "../models/PublishVenderModal.js";
import { UserModel } from "../models/UserModel.js"
import { VenderModel } from "../models/VenderModel.js"
import { addActivity } from "../services/activity.js";
import { sendEmailToVender } from "../services/email/venderEmail.js";
import errorHandlers from "../utils/errorHandlers.js";



export const myProfile = async (req, res, next) => {
    try {
        const profile = await UserModel.findOne({ _id: req.userId }).populate("venderId")

        return res.status(200).json({
            message: 'Profile Detail',
            result: profile
        })
    } catch (err) {
        console.log("err", err)
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}


export const logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(401).json({ message: res.err })
        }
        res.clearCookie("connect.sid", {
            secure: process.env.NODE_ENV === "development" ? false : true,
            httpOnly: process.env.NODE_ENV === "development" ? false : true,
            sameSite: process.env.NODE_ENV === "development" ? false : "none",
        });
        res.status(200).json({
            message: "Logged Out",

        })
    })
}


export const getAdminUsers = async (req, res, next) => {
    const users = await UserModel.find({})
    res.status(200).json({
        success: true,
        users,
    })
}


export const getAdminStats = async (req, res, next) => {
    const usersCount = await UserModel.countDocuments();
    const orders = await UserModel.find({})

    const preparingsOrders = orders.filter(i => i.orderStatus === "preparing")
    const shippedOrders = orders.filter(i => i.orderStatus === "Shipped")
    const deliveredOrders = orders.filter(i => i.orderStatus === "Delivered")

    let totalIncome = 0
    orders.forEach(i => {
        totalIncome += i.totalAmount
    })

    res.status(200).json({
        success: true,
        usersCount,
        ordersCount: {
            total: orders.length,
            preparing: preparingsOrders.length,
            shipped: shippedOrders.length,
            delivered: deliveredOrders.length
        },
        totalIncome,
    })
}

export const users = async (req, res, next) => {

    try {
        console.log('req.body', req.query)
        const filter = [{ deletedAt: { $exists: false } }];
        if (req.query.filter) {
            filter.push(req.query.filter)
        }
        if (req.query.search) {
            filter.push({
                $or: [
                    { email: { '$regex': req.query.search, '$options': 'i' } },
                    { name: { '$regex': req.query.search, '$options': 'i' } },
                ]
            })
        }
        const user = await UserModel.paginate(filter.length ? { $and: filter } : {}, { ...req.query, populate: "savedVender" })

        if (!user) {
            return res.status(401).json({ message: "user not exist!" });
        }
        res.json(user);

    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}



export const userDetails = async (req, res, next) => {

    try {
        const details = await UserModel.findOne({ _id: req.params.id }).populate({ path: "savedVender" })
        return res.status(200).json({ result: details })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const meDetails = async (req, res, next) => {
    try {
        const details = await UserModel.findOne({ _id: req.query.id })
        return res.status(200).json({ result: details })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const savedVender = async (req, res, next) => {

    try {
        const VenderId = req.params.id

        const vender = await PublishVenderModel.findById(VenderId)
        console.log("vender", vender)

        if (!vender) {
            return res.status(500).json({ message: "VenderId Not Exist" })
        }
        const saved = await UserModel.findOne({ _id: req.userId, savedVender: { "$in": VenderId } });
        let details
        if (saved) {
            details = await UserModel.findByIdAndUpdate(req.userId,
                {
                    $pull: {
                        savedVender: VenderId

                    }
                }, { new: true }
            )
        } else {
            details = await UserModel.findByIdAndUpdate(req.userId,
                {
                    $push: {
                        savedVender: {
                            $each: [VenderId],
                            $position: 0
                        }
                    }
                }, { new: true }
            )
        }
        sendEmailToVender("saveProfileOnVender", vender, { user: details })
        return res.status(200).json({ message: saved ? "saved" : "unSaved", result: details })
    } catch (err) {
        console.log("err", err)
        return res.status(500).json({ message: err.message });
    }
}

export const likeVender = async (req, res, next) => {

    try {
        const VenderId = req.params.id;
        const vender = await PublishVenderModel.findById(VenderId)
        console.log("vender", vender)

        if (!vender) {
            return res.status(500).json({ message: "VenderId Not Exist" })
        }
        const saved = await UserModel.findOne({ _id: req.userId, savedVender: { "$in": VenderId } });


        let details
        if (saved) {
            details = await UserModel.findByIdAndUpdate(req.userId,
                {
                    $pull: {
                        likeVender: VenderId
                    }
                }
            )
        } else {
            details = await UserModel.findByIdAndUpdate(req.userId,
                {
                    $push: {
                        likeVender: {
                            $each: [VenderId],
                            $position: 0
                        }
                    }
                }
            )
        }
        // await sendEmailToVender("saveProfileOnVender", vender, { user: details })
        return res.status(200).json({ message: saved ? "unLike" : "Like", result: details })
    } catch (err) {
        console.log("err", err)
        return res.status(500).json({ message: err.message });
    }
}

export const likeDestination = async (req, res, next) => {

    try {
        const destinationId = req.params.id
        console.log("req ", req.cookies)
        console.log("session", req.session)
        console.log("requser", req.user)

        const vender = await DestinationModal.findOne({ _id: destinationId })
        console.log("vender", vender)

        if (!destinationId) {
            return res.status(500).json({ message: "destinationId Not Exist" })
        }
        const saved = await UserModel.findOne({ _id: req.userId, likeDestination: { "$in": destinationId } });

        console.log("save", saved, req.userId)



        let details
        if (saved) {
            details = await UserModel.findByIdAndUpdate(req.userId,
                {
                    $pull: {
                        likeDestination: destinationId
                    }
                }, { new: true }
            )
        } else {
            details = await UserModel.findByIdAndUpdate(req.userId,
                {
                    $push: {
                        likeDestination: {
                            $each: [destinationId],
                            $position: 0
                        }
                    }
                }, { new: true }
            )
        }
        // await sendEmailToVender("saveProfileOnVender", vender, { user: details })
        return res.status(200).json({ message: saved ? "unLike" : "Like", result: details })
    } catch (err) {
        console.log("err", err)
        return res.status(500).json({ message: err.message });
    }
}


export const deleteUser = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id)
        const deleteUser = await UserModel.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date(), email: `${user.email}.deleted`
        });
        if (!deleteUser) {
            return res.status(500).json({ message: "Nothing to delete" });
        }
        addActivity("user", "delete", deleteUser._id)

        res.json(deleteUser)
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}



export const updateUserById = async (req, res, next) => {
    try {

        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body)
        addActivity("user", "update", user._id)

        return res.status(200).json({
            message: "User Updated Seccessfully",
            result: user
        })
    } catch (err) {
        return res.status(500).json({
            error: {
                message: err.message,
                error: err
            }
        })
    }
}


export const updateProfile = async (req, res, next) => {
    try {
        console.log("req.userId", req.userId);
        const profile = await UserModel.findByIdAndUpdate(req.userId, req.body)
        return res.status(200).json({
            message: "Profile Updated Seccessfully",
            result: profile
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