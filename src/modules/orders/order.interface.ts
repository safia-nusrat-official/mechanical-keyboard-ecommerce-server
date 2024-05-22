import { Model } from 'mongoose';

export interface TOrder {
  email: string;
  productId: string;
  price: number;
  quantity: number;
}

export interface TOrderMethods {}

export type TOrderModel = Model<TOrder, {}, TOrderMethods>;
