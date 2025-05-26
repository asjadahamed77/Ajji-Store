import express from "express"
import { getAccessories, getAppleProducts, getIpadsOrTablets, getNewArrivals, getProductsByCategory, getRelatedProducts, getSamsungProducts, getSingleProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.get('/new-arrivals', getNewArrivals) 
productRouter.get("/related/:productId", getRelatedProducts);

productRouter.get('/:category', getProductsByCategory)
productRouter.get('/product/:id', getSingleProduct)
productRouter.get('/brand/apple', getAppleProducts)
productRouter.get('/brand/samsung', getSamsungProducts)
productRouter.get('/category/accessory', getAccessories)
productRouter.get('/category/tab', getIpadsOrTablets)


export default productRouter