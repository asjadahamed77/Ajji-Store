import express from "express"
import { getProductsByCategory, getSingleProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.get('/:category', getProductsByCategory)
productRouter.get('/product/:id', getSingleProduct)

export default productRouter