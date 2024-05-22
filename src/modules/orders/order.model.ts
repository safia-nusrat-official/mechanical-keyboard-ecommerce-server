import mongoose from 'mongoose';
import { TOrder, TOrderMethods, TOrderModel } from './order.interface';
import { productServices } from '../product/product.services';
import { Product } from '../product/product.model';

const orderSchema = new mongoose.Schema<TOrder, TOrderModel, TOrderMethods>({
  email: { type: String },
  productId: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

// checks if the product that's being ordered exists in db with the given productId before the order is saved to db
orderSchema.pre('save', async function (next) {
  const productExists = (await productServices.getProductById(this.productId)) ?? false;
  if (!productExists) {
    throw new Error(
      `No product with the id ${this.productId} exists in Database.`,
    );
  }

  console.log(`Ordered product's cr status before reducing`, productExists.inventory.inStock)

  if (this.quantity > productExists.inventory.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  } else if (this.quantity === productExists.inventory.quantity) {
    // use the reduceQuantity method on productExists and pass the orderedQuantity number
    await Product.reduceQuantity(this.productId, this.quantity, productExists.inventory.quantity)
  } else {
    await Product.reduceQuantity(this.productId, this.quantity, productExists.inventory.quantity)
 }
  next();
});

export const Order = mongoose.model<TOrder>('Order', orderSchema);
