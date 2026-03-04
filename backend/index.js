import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
dotenv.config()
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import authRouter from "./routes/authRoutes.js";
import categoryrouter from "./routes/categoryRoutes.js";
import subcategoryrouter from "./routes/subCategoryRoutes.js";

let port = process.env.PORT || 6000

let app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
 origin:["https://task-frontend-smj2.onrender.com" , "https://task-admin-53db.onrender.com"],
 credentials:true
}))

app.use("/api/auth",authRouter)
app.use("/api/subcategory",subcategoryrouter)
app.use("/api/category",categoryrouter)
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)


app.listen(port,()=>{
    console.log(`server is live at ${port}`)
    connectDb()
})


