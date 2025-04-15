import express from "express";
import userAuth from "../middlewares/userAuth.js";
import {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderToShipped,
  getAdminOrders
} from "../controllers/orderController.js";
import authAdmin from "../middlewares/adminAuth.js";

const orderRouter = express.Router();

// Create new order
orderRouter.post("/", userAuth, createOrder);

// Get order by ID
orderRouter.get("/:id", userAuth, getOrderById);

// Get user's orders
orderRouter.get("/", userAuth, getUserOrders);
orderRouter.get("/admin/orders", authAdmin, getAdminOrders);

// Update order to paid
orderRouter.put("/:orderId/pay", userAuth, updateOrderToPaid);

// Update order to shipped
orderRouter.put("/:orderId/ship", userAuth, updateOrderToShipped);

// Update order to delivered
orderRouter.put("/:orderId/deliver", userAuth, updateOrderToDelivered);

export default orderRouter; 