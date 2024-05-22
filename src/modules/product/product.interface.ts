import { Model } from 'mongoose';

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TVariants = {
  type: string;
  value: string;
};

export interface TProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariants[];
  inventory: TInventory;
}

export interface TProductModel extends Model<TProduct> {
  doesProductExist(productName: string): Promise<TProduct | null>;
}

export type TUpdatedInventory = {
  quantity?: number;
  inStock?: boolean;
};

export type TUpdatedVariants = {
  type?: string;
  value?: string;
};

export interface TUpdatedProduct {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  tags?: string[];
  variants?: TUpdatedVariants[];
  inventory?: TUpdatedInventory;
} 