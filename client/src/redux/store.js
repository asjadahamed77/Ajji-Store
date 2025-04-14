import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import orderReducer from './slices/orderSlice'

const store = configureStore({
    reducer: {
       auth: authReducer,
       products: productReducer,  
       cart:   cartReducer,
       order: orderReducer
    }
})

export default store