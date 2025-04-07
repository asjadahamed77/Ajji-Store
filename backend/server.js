import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import authRouter from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import router from './routes/userRoutes.js'



//App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

const allowedOrigins = ['http://localhost:5173','http://localhost:5174']


app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))



// API ENDPOINTS
app.use('/api/auth',authRouter)
app.use('/api/user', router)


app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=> console.log("Server Started on Port",port))

export default app