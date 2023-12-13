import express, { Router } from "express";
import { isAuthenticated, authorizeAdmin } from '../middlewares/auth.js'
import { getAdminOrders, getMyOrders, getOrderDetails, placeOrder, proccessOrder, placeOrderOnline } from "../controllers/order.controller.js";


const router = express.Router();

router.post("/createorder", isAuthenticated, placeOrder)
router.post("/createorderonline", placeOrderOnline)

router.get('/myorders', isAuthenticated, getMyOrders)
router.get("/order/:id", isAuthenticated, getOrderDetails)

//add admin midleware
router.get('/admin/orders', isAuthenticated, authorizeAdmin, getAdminOrders)
router.get('/admin/order/:id', authorizeAdmin, proccessOrder)

export default router