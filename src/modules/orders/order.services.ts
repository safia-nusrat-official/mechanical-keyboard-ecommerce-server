import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const insertOrderintoDB = async(order:TOrder) => {
    const result = await Order.create(order)
    return result
}

export const orderServices = {
    insertOrderintoDB
}