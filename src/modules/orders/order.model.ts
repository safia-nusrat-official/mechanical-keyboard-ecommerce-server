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

orderSchema.pre('save', async function (next) {
  // this represents the order itself
  const productExists = (await productServices.getProductById(this.productId)) ?? false;
  
  // throws error if the product that's being ordered doesnot exists in db 
  if (!productExists) {
    throw new Error(
      `No product with the id ${this.productId} exists in Database.`,
    );
  }

  // throws an error if the ordered quantity exceeds the product's available quantity in inventory
  if (this.quantity > productExists.inventory.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  } 
  
  // uses the reduceQuantity static method on the Product model to reduce the number of ordered quantity from the ordered product's invetory's quantity and update the inStock status
  else if (this.quantity === productExists.inventory.quantity) {
    await Product.reduceQuantity(this.productId, this.quantity, productExists.inventory.quantity)
  } else {await Product.reduceQuantity(this.productId, this.quantity, productExists.inventory.quantity)
 }
  next();
});

export const Order = mongoose.model<TOrder>('Order', orderSchema);
