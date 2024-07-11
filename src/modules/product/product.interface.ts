import { Model } from 'mongoose';

export interface TProduct {
  title: string;
  image:string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  availableQuantity: number;
}

export interface TProductModel extends Model<TProduct> {
  reduceQuantity(
    orderedProductId: string,
    orderedQuantity: number,
    currentProductQuantity: number,
  ): Promise<any>;
}

// interfaces for product data to be updated
export interface TUpdatedProduct {
  title?: string;
  image?:string;
  description?: string;
  price?: number;
  rating?: number;
  brand?: string;
  availableQuantity?: number;
}
