
import cloudinary from '../config/cloudinary.js'; 
import fs from 'fs';
import { Product } from '../models/product.js';


// Helper to upload image to Cloudinary and return URL
const uploadToCloudinary = async (path) => {
  const result = await cloudinary.uploader.upload(path, {
    resource_type: 'image',
  });
  
  
  return { url: result.secure_url, public_id: result.public_id };
};

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      description,
      price,
      stock,
      variants,
      specifications,
    } = req.body;

    const images = req.files || []; 


    const uploadedImages = await Promise.all(
      images.map(async (img) => {
        const upload = await uploadToCloudinary(img.path);
        fs.unlinkSync(img.path); // remove local file after upload
        return upload;
      })
    );

    const newProduct = new Product({
      name,
      brand,
      category,
      description,
      specifications: JSON.parse(specifications),
      images: uploadedImages, 
    });

    if (["mobile", "laptop", "macbook", "ipad", "tablet", "watch"].includes(category)) {
      newProduct.variants = JSON.parse(variants);
    } else {
      newProduct.price = price;
      newProduct.stock = stock;
    }

    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    console.error("Add Product Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    if (updateFields.specifications) {
      updateFields.specifications = JSON.parse(updateFields.specifications);
    }
    if (updateFields.variants) {
      updateFields.variants = JSON.parse(updateFields.variants);
    }

    const images = Object.values(req.files || {}).flat();

    if (images.length > 0) {
      const uploadedImages = await Promise.all(
        images.map(async (img) => {
          const upload = await uploadToCloudinary(img.path);
          fs.unlinkSync(img.path);
          return upload;
        })
      );
      updateFields.images = uploadedImages;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, { new: true });
    res.status(200).json({ success: true, product: updatedProduct });
  } catch (err) {
    console.error("Edit Product Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // Delete images from Cloudinary
    await Promise.all(
      product.images.map(async (img) => {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      })
    );

    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error("Get Products Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error("Get By Category Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
