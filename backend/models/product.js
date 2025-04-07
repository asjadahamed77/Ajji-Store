import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  storage: { type: String, required: false }, // For mobiles, laptops, etc.
  color: { type: String, required: false },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
}, { _id: false });

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  rating: Number,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['mobile', 'tablet', 'laptop', 'accessory', 'macbook', 'airpod', 'watch', 'ipad'],
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    }
  ],
  variants: {
    type: [variantSchema],
    default: [],
  },
  price: {
    type: Number,
    required: function () {
      return this.variants.length === 0; // price only required if no variants
    },
  },
  stock: {
    type: Number,
    required: function () {
      return this.variants.length === 0;
    },
  },
  specifications: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  tags: {
    type: [String],
    default: [],
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: [reviewSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Handle model caching in dev environments
export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
