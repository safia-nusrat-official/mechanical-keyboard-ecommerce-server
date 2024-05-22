import { TOrder } from './order.interface';
import { Order } from './order.model';

const insertOrderintoDB = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};
const getAllOrdersFromDB = async (searchEmail?: string) => {
  if (searchEmail) {
    const result = await Order.find({ email: searchEmail });
    return result;
  }
  const result = await Order.find({});
  return result;
};

export const orderServices = {
  insertOrderintoDB,
  getAllOrdersFromDB,
};
