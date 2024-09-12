import Razorpay from "razorpay";
import crypto from "crypto"
import { PaymentModel } from "../models/PaymentModel.js";
import { SubscriptionPackegeModel } from "../models/SubscriptonPackegeModel.js";


export const order = async (req, res, next) => {
    const userId = req.userId
    const packegeId = req.body.packegeId
    const subscriptionPackege = await SubscriptionPackegeModel.findOne({ _id: packegeId });
    if (!subscriptionPackege) {
        res.status(400).json({
            message: "Packege Note Found"
        });
    }

    const price = subscriptionPackege?.onboding + subscriptionPackege?.registration + subscriptionPackege?.listing
    const discount = subscriptionPackege?.discount
    const totalAmount = price * ((100 - discount) / 100)
    // initializing razorpay
    const razorpay = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
    });

    // setting up options for razorpay order.
    const options = {
        amount: totalAmount,
        currency: "INR",
        // receipt: `${userId}-${packegeId}`,
        notes: JSON.stringify({
            userId: userId,
            packegeId: packegeId
        }),
        payment_capture: 1,
    };
    try {
        const response = await razorpay.orders.create(options)

        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
    } catch (err) {
        console.log("err", err)
        res.status(400).send('Not able to create order. Please try again!');
    }
}



export const paymentCapture = async (req, res, next) => {
    console.log("req.body", req.body)
    const secret_key = process.env.KEY_SECRET
    const orderId = req.body.orderDetails.orderId
    // do a validation


    const data = crypto.createHmac('sha256', secret_key)

    data.update(JSON.stringify(req.body))

    const digest = data.digest('hex')

    if (digest === req.headers['x-razorpay-signature']) {
        const razorpay = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        console.log('request is legit')
        const pay = await razorpay.orders.fetch(orderId)
        console.log("pay", pay)

        const { userId, packegeId } = pay.notes

        const payment = await PaymentModel.create({ payDetail: pay, orderDetails, userId, packegeId })

        //We can send the response and store information in a database.

        res.json({
            status: 'ok'
        })

    } else {
        res.status(400).send('Invalid signature');
    }
}



// export const refund = async (req, res, next) => {
//     try {

//         //Verify the payment Id first, then access the Razorpay API.

//         const options = {
//             payment_id: req.body.paymentId,
//             amount: req.body.amount,
//         };

//         const razorpayResponse = await razorpay.refund(options);

//         //We can send the response and store information in a database

//         res.send('Successfully refunded')

//     } catch (error) {

//         console.log(error);
//         res.status(400).send('unable to issue a refund');

//     }
// }



// export const payment = async (req, res, next) => {
//     console.log("req", req.body)
//     try {


//         const pay = await razorpay.orders.fetch(req.body.orderDetails.orderId)
//         console.log("pay", pay)

//         const payment = await PaymentModel.create(pay)
//         return res.status(201).json({
//             message: "Payment Created Successfully",
//             result: payment
//         })
//     } catch (err) {
//         console.log("err", err)
//         return res.status(500).json({
//             message: err.message,
//             error: err
//         })
//     }
// }