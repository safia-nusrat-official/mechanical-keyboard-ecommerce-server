import express from "express"
import { orderControllers } from "./order.controllers"
import { validateRequest } from "../../app/middlewares/validateRequest"
import { orderValidation } from "./order.validation"

export const orderRoutes = express.Router()

orderRoutes.post("/", validateRequest(orderValidation), orderControllers.createOrder)
orderRoutes.get("/", orderControllers.getAllOrders)