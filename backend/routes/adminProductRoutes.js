import express from "express"
import { addProduct } from "../controllers/productController.js"
import authAdmin from "../middlewares/adminAuth.js"
import upload from "../middlewares/multer.js"

const adminProductRouter = express.Router()

adminProductRouter.post(
    '/add',
    authAdmin,
    upload.array('images', 6), 
    addProduct
  );

export default adminProductRouter