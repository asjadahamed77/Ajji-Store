import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { Product } from "../models/product.js";
import { log } from "console";

// Helper to upload image to Cloudinary and return URL
const uploadToCloudinary = async (path) => {
  const result = await cloudinary.uploader.upload(path, {
    resource_type: "image",
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

    if (
      ["mobile", "laptop", "macbook", "ipad", "tablet", "watch"].includes(
        category
      )
    ) {
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
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Update basic details
    product.name = req.body.name || product.name;
    product.brand = req.body.brand || product.brand;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;

    const variantCategories = [
      "mobile",
      "laptop",
      "macbook",
      "ipad",
      "tablet",
      "watch",
    ];

    // Handle variants for specific categories
    if (variantCategories.includes(product.category)) {
      if (req.body.variants) {
        try {
          const parsedVariants = JSON.parse(req.body.variants);

          // Ensure each variant has the required fields
          const validVariants = parsedVariants.map((variant) => ({
            storage: variant.storage || "",
            color: variant.color || "",
            price: Number(variant.price) || 0,
            stock: Number(variant.stock) || 0,
          }));

          product.variants = validVariants;
        } catch (error) {
          console.error("Error parsing variants:", error);
          return res
            .status(400)
            .json({ success: false, message: "Invalid variants data" });
        }
      }
    } else {
      product.price = req.body.price || product.price;
      product.stock = req.body.stock || product.stock;
    }

    // Handle specifications
    if (req.body.specifications) {
      product.specifications = JSON.parse(req.body.specifications);
    }

    // Handle existing images
    if (req.body.existingImages) {
      const existingImages = JSON.parse(req.body.existingImages);
      product.images = existingImages;
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      const uploadedImages = await Promise.all(
        req.files.map(async (file) => {
          const upload = await uploadToCloudinary(file.path);
          fs.unlinkSync(file.path); // remove local file after upload
          return upload;
        })
      );

      // Append new images to existing images if needed
      product.images = [...product.images, ...uploadedImages].slice(0, 6); // Limiting to a max of 6 images
    }

    // Save the updated product
    await product.save();

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.log("Edit Product Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update product." });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

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
    const products = await Product.find({}).sort({ createdAt: -1 });
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

export const getAppleProducts = async (req, res) => {
  try {
    const appleProducts = await Product.find({ brand: "Apple" })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({ success: true, appleProducts });
  } catch (err) {
    console.error("Get By Category Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    console.error("Get Single Product Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
