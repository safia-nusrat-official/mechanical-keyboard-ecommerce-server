import express from "express"
import { productControllers } from "./product.controller"

const productRoutes = express.Router()

productRoutes.post("/", productControllers.createProduct)

productRoutes.get("/", productControllers.getAllProducts)

productRoutes.get("/:productId", productControllers.getProductById)

productRoutes.put("/:productId", productControllers.updateProductInfo)

productRoutes.delete("/:productId", productControllers.deleteProduct)


export default productRoutes