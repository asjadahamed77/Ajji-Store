import express from "express"
import { addProduct, deleteProduct, getProducts } from "../controllers/productController.js"
import authAdmin from "../middlewares/adminAuth.js"
import upload from "../middlewares/multer.js"

const adminProductRouter = express.Router()

adminProductRouter.post(
    '/add',
    authAdmin,
    upload.array('images', 6), 
    addProduct
  );

  adminProductRouter.get('/all', authAdmin, getProducts);
  adminProductRouter.delete('/:id', authAdmin, deleteProduct);

export default adminProductRouter