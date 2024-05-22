import express, { Application, Request, Response } from "express"
import cors from "cors"
import productRoutes from "./modules/product/product.route"
import { orderRoutes } from "./modules/orders/order.routes"

const app:Application = express()

app.use(express.json())
app.use(cors())

app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

app.get("/", (req:Request, res:Response)=>{
    res.send("Home page.")
})

export default app