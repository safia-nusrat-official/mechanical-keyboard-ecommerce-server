import { Model, Types } from 'mongoose';

export interface TOrder {
  date: string;
  paymentMethod: string;
  status: 'delivered' | 'pending' | 'cancelled';
  name: string;
  phone: string;
  address: string;
  email: string;
  productId: Types.ObjectId;
  price: number;
  orderedQuantity: number;
}

export interface TOrderMethods {}

export type TOrderModel = Model<TOrder, {}, TOrderMethods>;
