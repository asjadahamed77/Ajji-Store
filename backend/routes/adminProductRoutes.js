import express from "express"
import { addProduct, deleteProduct, editProduct, getProducts, getSingleProduct } from "../controllers/productController.js"
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
  adminProductRouter.get('/:id', authAdmin, getSingleProduct);
  adminProductRouter.put(
    '/:id', 
    authAdmin,
    upload.array('images', 6), 
    editProduct
  );

export default adminProductRouter