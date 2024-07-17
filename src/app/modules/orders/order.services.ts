import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const insertOrderintoDB = async (order: IOrder) => {
  const { orderedProducts, totalOrderedQuantity } = order;
  for (const orderedProduct of orderedProducts) {
    const product = await Product.findById(orderedProduct.productId);
    if (!product) {
      throw new AppError(404, 'Product not found.');
    }

    // throws an error if the ordered quantity exceeds the product's available quantity in inventory
    if (orderedProduct.orderedQuantity > product.availableQuantity) {
      throw new Error('Insufficient quantity available in inventory');
    }

    // uses the reduceQuantity static method on the Product model to reduce the number of ordered quantity from the ordered product's invetory's quantity
    else {
      await Product.reduceQuantity(
        orderedProduct.productId.toString(),
        orderedProduct.orderedQuantity,
        product.availableQuantity,
      );
    }
  }

  const result = await Order.create(order);
  return result;
};
const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find({}).populate('orderedProducts.productId'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = orderQuery.modelQuery;
  return result;
};

export const orderServices = {
  insertOrderintoDB,
  getAllOrdersFromDB,
};
