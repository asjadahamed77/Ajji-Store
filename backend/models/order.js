import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product ID is required."],
      },
      name: {
        type: String,
        required: [true, "Product name is required."],
      },
      storage: {
        type: String,
      },
      image: {
        type: String,
        required: [true, "Product image is required."],
      },
      price: {
        type: Number,
        required: [true, "Product price is required."],
        min: [0, "Price cannot be negative."],
      },
      brand: {
        type: String,
        required: [true, "Product brand is required."],
      },
      color: {
        type: String,
        required: false,
      },
      quantity: {
        type: Number,
        required: [true, "Product quantity is required."],
        min: [1, "Quantity must be at least 1."],
        default: 1,
      },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
        name: {
          type: String,
        
        },
        address: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
      paymentMethod: {
        type: String,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      isPaid: {
        type: Boolean,
        required: true,
      },
      paidAt: {
        type: Date,
      },
      isDelivered: {
        type: Boolean,
        default: false
      },
      deliveredAt: {
        type: Date
      },
      paymentStatus:{
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
        default: "Pending"
      },
      status: {
        type: String,
        enum: ["Processing","Shipped","Delivered","Cancelled"],
        default: "Processing"
      },

},
{ timestamps: true }
)

const orderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
