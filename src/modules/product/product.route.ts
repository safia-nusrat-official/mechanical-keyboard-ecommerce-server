import express from "express"
import { productControllers } from "./product.controller"

const productRoutes = express.Router()

productRoutes.post("/", productControllers.createProduct)

productRoutes.get("/", productControllers.getAllProducts)


export default productRoutes