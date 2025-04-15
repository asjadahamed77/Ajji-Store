import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './slices/adminSlice'
import orderReducer from './slices/orderSlice'

const store = configureStore({
    reducer: {
       admin: adminReducer,
        order: orderReducer,
    }
})

export default store