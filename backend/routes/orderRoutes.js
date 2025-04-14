import express from "express";
import userAuth from "../middlewares/userAuth.js";
import {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderToPaid,
  updateOrderToDelivered
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Create new order
orderRouter.post("/", userAuth, createOrder);

// Get order by ID
orderRouter.get("/:id", userAuth, getOrderById);

// Get user's orders
orderRouter.get("/", userAuth, getUserOrders);

// Update order to paid
orderRouter.put("/:id/pay", userAuth, updateOrderToPaid);

// Update order to delivered
orderRouter.put("/:id/deliver", userAuth, updateOrderToDelivered);

export default orderRouter; 