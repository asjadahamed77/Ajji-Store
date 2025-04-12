import express from "express"
import { getAccessories, getAppleProducts, getIpadsOrTablets, getProductsByCategory, getSamsungProducts, getSingleProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.get('/:category', getProductsByCategory)
productRouter.get('/product/:id', getSingleProduct)
productRouter.get('/brand/apple', getAppleProducts)
productRouter.get('/brand/samsung', getSamsungProducts)
productRouter.get('/category/accessory', getAccessories)
productRouter.get('/category/tab', getIpadsOrTablets)

export default productRouter