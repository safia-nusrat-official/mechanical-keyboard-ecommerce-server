import { Model, Types } from 'mongoose';

export type TOrderedProduct = {
  productId: Types.ObjectId;
  orderedQuantity: number;
};
export interface IOrder {
  date: string;
  paymentMethod: 'cash' | 'stripe';
  status: 'delivered' | 'pending' | 'cancelled';
  name: string;
  phone: string;
  address: string;
  email: string;
  orderedProducts: TOrderedProduct[];
  totalPrice: number;
  totalOrderedQuantity: number;
}

export interface TOrderMethods {}

export type TOrderModel = Model<IOrder, {}, TOrderMethods>;
