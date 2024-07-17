import mongoose, { Schema } from 'mongoose';
import {
  IOrder,
  TOrderedProduct,
  TOrderMethods,
  TOrderModel,
} from './order.interface';
import { productServices } from '../product/product.services';
import { Product } from '../product/product.model';

const productOrderedSchema = new Schema<TOrderedProduct>({
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  orderedQuantity: { type: Number, required: true },
});
const orderSchema = new Schema<IOrder, TOrderModel, TOrderMethods>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, enum: ['cash', 'stripe'], required: true },
  status: {
    type: String,
    enum: ['delivered', 'cancelled', 'pending'],
    required: true,
  },
  date: { type: String, required: true },
  orderedProducts: { type: [productOrderedSchema] },
  totalPrice: { type: Number },
  totalOrderedQuantity: { type: Number },
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);
