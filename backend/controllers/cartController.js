import Cart from "../models/cart.js";
import { Product } from "../models/product.js";

// Get user's cart
export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      // If no cart exists, create an empty one
      cart = new Cart({
        user: userId,
        products: [],
        totalPrice: 0,
      });
      await cart.save();
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  const { productId, quantity = 1, color, storage } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Find user's existing cart
    let cart = await Cart.findOne({ user: userId });

    // Determine price and other details based on whether product has variants
    let itemPrice = product.price;
    let itemColor = color || null;
    let itemStorage = storage || null;

    // If product has variants, find the matching variant
    if (product.variants && product.variants.length > 0) {
      // If color or storage is provided, find the matching variant
      if (color || storage) {
        const variant = product.variants.find(
          (v) => 
            (!color || v.color === color) && 
            (!storage || v.storage === storage)
        );

        if (!variant) {
          return res.status(400).json({ 
            success: false, 
            message: "Selected variant not found" 
          });
        }

        if (variant.stock < quantity) {
          return res.status(400).json({ 
            success: false, 
            message: "Not enough stock available" 
          });
        }

        itemPrice = variant.price;
        itemColor = variant.color;
        itemStorage = variant.storage;
      } else {
        // If no color or storage is provided, use the first variant
        const firstVariant = product.variants[0];
        itemPrice = firstVariant.price;
        itemColor = firstVariant.color;
        itemStorage = firstVariant.storage;

        if (firstVariant.stock < quantity) {
          return res.status(400).json({ 
            success: false, 
            message: "Not enough stock available" 
          });
        }
      }
    } else {
      // For non-variant products, check stock
      if (product.stock < quantity) {
        return res.status(400).json({ 
          success: false, 
          message: "Not enough stock available" 
        });
      }
    }

    // Create item to add
    const itemToAdd = {
      productId,
      name: product.name,
      storage: itemStorage,
      image: product.images[0].url,
      price: itemPrice,
      brand: product.brand,
      color: itemColor,
      quantity
    };

    if (!cart) {
      // If no cart exists, create one
      cart = new Cart({
        user: userId,
        products: [itemToAdd],
        totalPrice: itemPrice * quantity,
      });
    } else {
      // Check if product already exists in cart
      const existingItemIndex = cart.products.findIndex(
        (item) => 
          item.productId.toString() === productId && 
          (!itemColor || item.color === itemColor) && 
          (!itemStorage || item.storage === itemStorage)
      );

      if (existingItemIndex !== -1) {
        // Update quantity if product already in cart
        cart.products[existingItemIndex].quantity += quantity;
        cart.totalPrice += itemPrice * quantity;
      } else {
        // Add new item to cart
        cart.products.push(itemToAdd);
        cart.totalPrice += itemPrice * quantity;
      }
    }

    await cart.save();

    res.status(200).json({ success: true, cart, message: "Product added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    // Remove the item
    cart.products.splice(itemIndex, 1);
    
    // Recalculate total price
    cart.totalPrice = cart.products.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    await cart.save();

    res.status(200).json({ success: true, cart, message: "Product removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity, color, storage } = req.body;
  const userId = req.user.id;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ success: false, message: "Invalid quantity" });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.products.findIndex(
      (item) => 
        item.productId.toString() === productId && 
        (!color || item.color === color) && 
        (!storage || item.storage === storage)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    // Get the product to check stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Check stock availability
    if (product.variants && product.variants.length > 0) {
      const itemColor = cart.products[itemIndex].color;
      const itemStorage = cart.products[itemIndex].storage;
      
      const variant = product.variants.find(
        (v) => 
          (!itemColor || v.color === itemColor) && 
          (!itemStorage || v.storage === itemStorage)
      );

      if (!variant) {
        return res.status(400).json({ 
          success: false, 
          message: "Selected variant not found" 
        });
      }

      if (variant.stock < quantity) {
        return res.status(400).json({ 
          success: false, 
          message: "Not enough stock available" 
        });
      }
    } else {
      if (product.stock < quantity) {
        return res.status(400).json({ 
          success: false, 
          message: "Not enough stock available" 
        });
      }
    }

    // Calculate price difference
    const oldQuantity = cart.products[itemIndex].quantity;
    const pricePerItem = cart.products[itemIndex].price;
    const priceDifference = (quantity - oldQuantity) * pricePerItem;

    // Update quantity
    cart.products[itemIndex].quantity = quantity;
    
    // Update total price
    cart.totalPrice += priceDifference;
    
    await cart.save();

    res.status(200).json({ success: true, cart, message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
