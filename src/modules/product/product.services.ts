import { TProduct, TUpdatedProduct } from './product.interface';
import { Product } from './product.model';

const insertProductIntoDB = async (product: TProduct) => {
  const productAlreadyExists = Product.doesProductExist(product.name);
  if (await productAlreadyExists) {
    throw new Error('Product already exists.');
  }
  const result = await Product.create(product);
  return result;
};

const getAllProducts = async () => {
  const result = await Product.find({});
  return result;
};

const getProductById = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const updateProductInfo = async (
  productId: string,
  productInfo: TUpdatedProduct,
) => {
  const result = await Product.updateOne(
    { _id: productId },
    {
      $set: productInfo,
    },
  );
  return getProductById(productId);
};

const deleteAProduct = async (productId: string) => {
  const productAlreadyDeleted = await getProductById(productId)
  if(!productAlreadyDeleted){
    throw new Error("Product has already been deleted before.")
  }
  const result = await Product.deleteOne({ _id: productId });
  console.log(result);
  return result;
};

export const productServices = {
  insertProductIntoDB,
  getAllProducts,
  getProductById,
  updateProductInfo,
  deleteAProduct,
};
