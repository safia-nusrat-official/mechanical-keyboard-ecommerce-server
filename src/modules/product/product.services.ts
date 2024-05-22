import { TProduct } from './product.interface';
import { Product } from './product.model';

const insertProductIntoDB = async (product: TProduct) => {
  const productAlreadyExists =  Product.doesProductExist(product.name)
  if(await productAlreadyExists){
    throw new Error("Product already exists.")
  }
  const result = await Product.create(product);
  return result;
};

const getAllProducts = async() => {
  const result = await Product.find({})
  return result
} 

export const productServices = { insertProductIntoDB, getAllProducts };
