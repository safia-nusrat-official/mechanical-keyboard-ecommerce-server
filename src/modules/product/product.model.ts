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

const productSchema = new mongoose.Schema<
  TProduct,
  TProductModel
>({
  name: { type: String },
  description: String,
  price: Number,
  category: String,
  tags: [String],
  variants: [variantsSchema],
  inventory: inventorySchema,
});

// Makes sure the product doesnot exist in the db already before a product is inserted.
productSchema.pre('save', async function (next) {
  const result = await Product.findOne({ name: this.name });
  if(result){
    throw new Error(`Product named ${this.name} already exists!`)
  }
  next();
});

// a custom instance method to reduce the quantity and change inStock status based on the ordered quantities of the product
productSchema.statics.reduceQuantity = async function (
  orderedProductId:string,
  orderedQuantity: number,
  currentProductQuantity: number
) {
  const updatedProductStock = await Product.findByIdAndUpdate(orderedProductId, {
    $inc:{
      'inventory.quantity':-orderedQuantity
    },
    $set:{
      'inventory.inStock': orderedQuantity < currentProductQuantity
    }
  })
  return updatedProductStock;
};

export const Product = mongoose.model<TProduct, TProductModel>(
  'Product',
  productSchema,
);
