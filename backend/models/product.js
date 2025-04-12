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
    enum: ["Ambrane", "Anker", "Apple", "Asus", "Belkin", "boAt", "Boult Audio", "ESR", "Fire-Boltt", "Generic", "Google Pixel", "Infinix", "iQOO", "JBL", "Lenovo", "Mi", "Motorola", "Noise", "Nokia", "OnePlus", "OPPO", "Portronics", "Realme", "Ringke", "Samsung", "Sony", "Sony Xperia", "Spigen", "Tecno", "vivo", "Xiaomi"]
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
  images: [{
    url: String,
    public_id: String
  }],
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
