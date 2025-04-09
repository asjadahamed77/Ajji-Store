import express from "express"
import { getProductsByCategory } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.get('/:category', getProductsByCategory)

export default productRouter