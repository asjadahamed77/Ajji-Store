import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import { 
  addToCart, 
  getCart, 
  removeFromCart, 
  updateCartItemQuantity 
} from '../controllers/cartController.js';

const cartRouter = express.Router();

// Get user's cart
cartRouter.get('/', userAuth, getCart);

// Add item to cart
cartRouter.post('/', userAuth, addToCart);

// Remove item from cart
cartRouter.delete('/:productId', userAuth, removeFromCart);

// Update cart item quantity
cartRouter.put('/:productId', userAuth, updateCartItemQuantity);

export default cartRouter;