import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
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
      required: [true, "Product color is required."],
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

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    products: {
      type: [cartItemSchema],
      default: [],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required."],
      min: [0, "Total price cannot be negative."],
      default: 0,
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.models.cart || mongoose.model("Cart", cartSchema);

export default cartModel;
