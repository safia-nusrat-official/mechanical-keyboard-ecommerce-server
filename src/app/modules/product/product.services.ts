import httpStatus from 'http-status';
import { TProduct, TUpdatedProduct } from './product.interface';
import { Product } from './product.model';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';

const insertProductIntoDB = async (product: TProduct) => {
  const newProduct = new Product(product); // inserting a product in db by creating instance of Product Model
  const result = await newProduct.save(); // triggers a pre-hook to check if any product with the same name as the product's already exists
  return result;
};

const getAllProducts = async (query: Record<string, any>) => {
  const searchQuery = new QueryBuilder(Product.find({}), query)
    .search(['brand', 'title'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await searchQuery.modelQuery;
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
  const productExists = await Product.findById(productId);
  if (!productExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found.');
  }
  const result = await Product.findByIdAndUpdate(
    productId,
    {
      $set: productInfo,
    },
    {
      new: true,
    },
  );

  return result;
};

const deleteAProduct = async (productId: string) => {
  const productAlreadyDeleted = await Product.findById(productId);
  if (!productAlreadyDeleted) {
    throw new AppError(404, 'Product not found.');
  }
  const result = await Product.findByIdAndDelete(productId);
  return result;
};
const getProductsCount = async() => {
  const result = await Product.estimatedDocumentCount()
  return result
}

export const productServices = {
  insertProductIntoDB,
  getAllProducts,
  getProductById,
  updateProductInfo,
  deleteAProduct,
  getProductsCount
};
