import express from "express"
import { orderControllers } from "./order.controllers"

export const orderRoutes = express.Router()

orderRoutes.post("/", orderControllers.createOrder)