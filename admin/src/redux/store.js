import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './slices/adminSlice'
import orderReducer from './slices/orderSlice'
import userReducer from './slices/adminUsers'

const store = configureStore({
    reducer: {
       admin: adminReducer,
        order: orderReducer,
        users: userReducer,
    }
})

export default store