import Order from "../models/order.js";
import Cart from "../models/cart.js";
import { Product } from "../models/product.js";

// Create new order
export const createOrder = async (req, res) => {
  const {
    shippingAddress,
    paymentMethod,
    paymentResult
  } = req.body;

  const userId = req.user.id;

  try {
    // Get user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Cart is empty" 
      });
    }

    // Verify stock availability for all items
    for (const item of cart.products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: `Product ${item.name} not found` 
        });
      }

      if (product.variants && product.variants.length > 0) {
        const variant = product.variants.find(
          v => v.color === item.color && v.storage === item.storage
        );
        if (!variant || variant.stock < item.quantity) {
          return res.status(400).json({ 
            success: false, 
            message: `Not enough stock for ${item.name}` 
          });
        }
      } else if (product.stock < item.quantity) {
        return res.status(400).json({ 
          success: false, 
          message: `Not enough stock for ${item.name}` 
        });
      }
    }

    // Create order
    const order = new Order({
      user: userId,
      orderItems: cart.products.map(item => ({
        productId: item.productId,
        name: item.name,
        storage: item.storage,
        image: item.image,
        price: item.price,
        brand: item.brand,
        color: item.color,
        quantity: item.quantity
      })),
      shippingAddress,
      paymentMethod,
      paymentResult,
      totalPrice: cart.totalPrice,
      isPaid: paymentResult?.status === "COMPLETED",
      paidAt: paymentResult?.status === "COMPLETED" ? Date.now() : null,
      paymentStatus: paymentResult?.status === "COMPLETED" ? "Paid" : "Pending",
      status: "Processing"
    });

    await order.save();

    // Update product stock
    for (const item of cart.products) {
      const product = await Product.findById(item.productId);
      if (product.variants && product.variants.length > 0) {
        const variant = product.variants.find(
          v => v.color === item.color && v.storage === item.storage
        );
        variant.stock -= item.quantity;
      } else {
        product.stock -= item.quantity;
      }
      await product.save();
    }

    // Clear the cart
    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();

    // Populate user information before sending response
    const populatedOrder = await Order.findById(order._id).populate('user', 'name email phone address');

    res.status(201).json({ 
      success: true, 
      order: populatedOrder,
      message: "Order placed successfully" 
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id;

  try {
    const order = await Order.findOne({ 
      _id: orderId,
      user: userId 
    }).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('user', 'name email phone address');

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAdminOrders = async (req,res)=>{
    try {
        const orders = await Order.find({}).populate('user', 'name email phone address');
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

// Update order to paid
export const updateOrderToPaid = async (req, res) => {
  const { orderId } = req.params;
  const { paymentResult } = req.body;
  const userId = req.user.id;

  try {
    const order = await Order.findOne({ 
      _id: orderId,
      user: userId 
    });

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = paymentResult;
    order.paymentStatus = "Paid";

    await order.save();

    res.status(200).json({ 
      success: true, 
      order,
      message: "Order marked as paid" 
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update order to delivered
export const updateOrderToDelivered = async (req, res) => {
  const { orderId } = req.params;
  

  try {
    const order = await Order.findOne({ 
      _id: orderId,
      user 
    });

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.status = "Delivered";

    await order.save();

    res.status(200).json({ 
      success: true, 
      order,
      message: "Order marked as delivered" 
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update order to shipped
export const updateOrderToShipped = async (req, res) => {
  const { orderId } = req.params;
  
  



  try {
    const order = await Order.findOne({ 
      _id: orderId,
   
    });

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    order.status = "Shipped";

    await order.save();

    res.status(200).json({ 
      success: true, 
      order,
      message: "Order marked as shipped" 
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
