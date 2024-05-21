import mongoose from 'mongoose';
import {
  TProduct,
  TInventory,
  TVariants,
  TProductModel,
} from './product.interface';

const inventorySchema = new mongoose.Schema<TInventory>({
  quantity: Number,
  inStock: Boolean,
});
const variantsSchema = new mongoose.Schema<TVariants>({
  type: String,
  value: String,
});
const productSchema = new mongoose.Schema<TProduct, TProductModel>({
  name: { type: String },
  description: String,
  price: Number,
  category: String,
  tags: [String],
  variants: [variantsSchema],
  inventory: inventorySchema,
});
productSchema.statics.doesProductExist = async function (productName: string) {
  const existingProduct = await Product.findOne({ name: productName });
  return existingProduct;
};
export const Product = mongoose.model<TProduct, TProductModel>(
  'Product',
  productSchema,
);
