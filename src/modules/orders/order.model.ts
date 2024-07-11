import mongoose, { Schema } from 'mongoose';
import { TOrder, TOrderMethods, TOrderModel } from './order.interface';
import { productServices } from '../product/product.services';
import { Product } from '../product/product.model';

const orderSchema = new mongoose.Schema<TOrder, TOrderModel, TOrderMethods>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, 
    enum:["cash", "stripe"],
    required: true },
  status: {
    type: String,
    enum: ['delivered', 'cancelled', 'pending'],
    required: true,
  },
  date:{type:String, required:true},
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  price: { type: Number },
  orderedQuantity: { type: Number },
});


export const Order = mongoose.model<TOrder>('Order', orderSchema);
