import express, { Application, Request, Response } from "express"
import cors from "cors"
import productRoutes from "./modules/product/product.route"

const app:Application = express()

app.use(express.json())
app.use(cors())

app.use("/api/products", productRoutes)

app.get("/", (req:Request, res:Response)=>{
    res.send("Home page.")
})

export default app