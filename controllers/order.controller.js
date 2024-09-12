import { OrderModel } from '../models/OrderModel.js';

export const placeOrder = async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
    } = req.body;

    const user = req.user._id
    console.log('user', user)

    const orderOptions = {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        user,
    };

    await OrderModel.create(orderOptions)

    return res.status(201).json({
        success: true,
        messege: "Order Placed Seccessfuly Via Cash On Delivery"
    })
}



export const placeOrderOnline = async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
    } = req.body;

    const user = req.user._id
    console.log('user', user)

    const orderOptions = {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        user,
    };

    await OrderModel.create(orderOptions)

    return res.status(201).json({
        success: true,
        messege: "Order Placed Seccessfuly Via Cash On Delivery"
    })
}


export const getMyOrders = async (req, res, next) => {
    const orders = await OrderModel.find({
        user: "657835047d029ded524db99a"
    }).populate("user", "name")

    return res.status(200).json({
        success: true,
        orders,
    })
}



export const getOrderDetails = async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id).populate("user", "name")
    if (!order) {
        return res.status(400).json({ massege: "Invalid OrderId" })
    }

    return res.status(200).json({
        success: true,
        order,
    })
}


export const getAdminOrders = async (req, res, next) => {
    const order = await OrderModel.find({}).populate("user", "name")
    if (!order) {
        return res.status(400).json({ massege: "Invalid OrderId" })
    }

    return res.status(200).json({
        success: true,
        order,
    })
}



export const proccessOrder = async (req, res, next) => {

    const order = await OrderModel.findById(req.params.id)
    if (!order) {
        return res.status(400).json({ massege: "Invalid OrderId" })
    }

    if (order.orderStatus === "Preparing") order.orderStatus = "Shipped";
    else if (order.orderStatus === "Shipped") {
        order.orderStatus = "Delivered";
        order.deliveredAt = new Date(Date.now());
    }

    else if (order.orderStatus === "Delivered")
        return res.status(400).json({ messege: "Food Already Delivered" })

    await order.save();

    return res.status(200).json({
        success: true,
        messege: "Status Updated Successfully",
        order,
    })
}