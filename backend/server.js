import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'

import authRouter from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import router from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import adminProductRouter from './routes/adminProductRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'




//App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()



const allowedOrigins = ['http://localhost:5173','http://localhost:5174','https://ajji-store-client.vercel.app','https://ajji-store-admin.vercel.app']


app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))



// API ENDPOINTS
app.use('/api/auth',authRouter)
app.use('/api/user', router)
app.use('/api/admin', adminRouter)
app.use('/api/admin/product', adminProductRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)


app.get('/',(req,res)=>{
    res.send("API WORKING...")
})

app.listen(port,()=> console.log("Server Started on Port",port))

export default app