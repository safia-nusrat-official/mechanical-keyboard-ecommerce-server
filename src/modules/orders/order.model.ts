import mongoose, { Schema } from 'mongoose';
import { TOrder, TOrderMethods, TOrderModel } from './order.interface';
import { productServices } from '../product/product.services';
import { Product } from '../product/product.model';

const orderSchema = new mongoose.Schema<TOrder, TOrderModel, TOrderMethods>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  status: {
    type: String,
    enum: ['delivered', 'cancelled', 'pending'],
    required: true,
  },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  price: { type: Number },
  orderedQuantity: { type: Number },
});

orderSchema.pre('save', async function (next) {
  const productExists =
    (await productServices.getProductById(this.productId.toString())) ?? false;

  // throws error if the product that's being ordered doesnot exists in db
  if (!productExists) {
    throw new Error(
      `No product with the id ${this.productId} exists in Database.`,
    );
  }

  // throws an error if the ordered quantity exceeds the product's available quantity in inventory
  if (this.orderedQuantity > productExists.availableQuantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  // uses the reduceQuantity static method on the Product model to reduce the number of ordered quantity from the ordered product's invetory's quantity and update the inStock status
  else if (this.orderedQuantity === productExists.availableQuantity) {
    await Product.reduceQuantity(
      this.productId.toString(),
      this.orderedQuantity,
      productExists.availableQuantity,
    );
  } else {
    await Product.reduceQuantity(
      this.productId.toString(),
      this.orderedQuantity,
      productExists.availableQuantity,
    );
  }
  next();
});

export const Order = mongoose.model<TOrder>('Order', orderSchema);
