import express from "express"
import { getAppleProducts, getProductsByCategory, getSingleProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.get('/:category', getProductsByCategory)
productRouter.get('/product/:id', getSingleProduct)
productRouter.get('/brand/apple', getAppleProducts)

export default productRouter