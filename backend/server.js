import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'



//App Config
const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()



// MIDDLEWARES
app.use(express.json())
app.use(cors())

// API ENDPOINTS



app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=> console.log("Server Started on Port",port))

export default app