import express from "express"
import { productControllers } from "./product.controller"

const productRoutes = express.Router()

productRoutes.post("/", productControllers.createProduct)

export default productRoutes