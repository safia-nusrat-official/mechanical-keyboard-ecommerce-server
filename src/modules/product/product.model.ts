import mongoose from 'mongoose';
import {
  TProduct,
  TProductModel,
} from './product.interface';

const productSchema = new mongoose.Schema<TProduct, TProductModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  availableQuantity: { type: Number, required: true },
});

// Makes sure the product doesnot exist in the db already before a product is inserted.
productSchema.pre('save', async function (next) {
  const result = await Product.findOne({ title: this.title });
  if (result) {
    throw new Error(`Product name ${this.title} already exists!`);
  }
  next();
});

// a custom instance method to reduce the quantity and change inStock status based on the ordered quantities of the product
productSchema.statics.reduceQuantity = async function (
  orderedProductId: string,
  orderedQuantity: number,
  currentProductQuantity: number,
) {
  const updatedProductStock = await Product.findByIdAndUpdate(
    orderedProductId,
    {
      $inc: {
        'availableQuantity': -orderedQuantity,
      },
    },
  );
  return updatedProductStock;
};

export const Product = mongoose.model<TProduct, TProductModel>(
  'Product',
  productSchema,
);
