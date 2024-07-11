import QueryBuilder from '../../app/builder/QueryBuilder';
import AppError from '../../app/errors/AppError';
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const insertOrderintoDB = async (order: TOrder) => {
  const productExists = await Product.findById(order.productId);
  if (!productExists) {
    throw new AppError(404, 'Product not found.');
  }

  // throws an error if the ordered quantity exceeds the product's available quantity in inventory
  if (order.orderedQuantity > productExists.availableQuantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  // uses the reduceQuantity static method on the Product model to reduce the number of ordered quantity from the ordered product's invetory's quantity
  else {
    await Product.reduceQuantity(
      order.productId.toString(),
      order.orderedQuantity,
      productExists.availableQuantity,
    );
  }
  const result = await Order.create(order);
  return result;
};
const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find({}).populate('productId'),
    query,
  )
    .filter()
    .sort()
    .paginate();
  const result = orderQuery.modelQuery;
  return result;
};

export const orderServices = {
  insertOrderintoDB,
  getAllOrdersFromDB,
};
