import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'

import authRouter from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import router from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import adminProductRouter from './routes/adminProductRoutes.js'




//App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()



const allowedOrigins = ['http://localhost:5173','http://localhost:5174']


app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))



// API ENDPOINTS
app.use('/api/auth',authRouter)
app.use('/api/user', router)
app.use('/api/admin', adminRouter)
app.use('/api/admin/product', adminProductRouter)


app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=> console.log("Server Started on Port",port))

export default app