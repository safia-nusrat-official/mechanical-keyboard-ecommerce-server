import { TProduct, TUpdatedProduct } from './product.interface';
import { Product } from './product.model';

const insertProductIntoDB = async (product: TProduct) => {
  const newProduct = new Product(product) // inserting a product in db by creating instance of Product Model
  const result = await newProduct.save(); // triggers a pre-hook to check if any product with the same name as the product's already exists
  return result;
};

const getAllProducts = async (searchQuery?: string):Promise<Array<TProduct>> => {
  if (searchQuery) {
    const searchQueryRegex = new RegExp(`${searchQuery}`);

    // using aggregation and regex to search for the provided query across the necessary fields
    const result = await Product.aggregate([
      {
        $unwind:"$variants" // destructuring the varaints array to operate on them separately
      },
      {
        $match: {
          $or: [
            { description: { $regex: searchQueryRegex, $options: 'i' } },
            { tags: { $elemMatch: { $regex: searchQueryRegex, $options: 'i' } } },
            { category: { $regex: searchQueryRegex, $options: 'i' } },
            { name: { $regex: searchQueryRegex, $options: 'i' } },
            { "variants.type": { $regex: searchQueryRegex, $options: 'i' } },
            { "variants.value": { $regex: searchQueryRegex, $options: 'i' } },
          ],
        },
      }
    ]);
    return result;
  }
  const result = await Product.find({}); // returning all products if no search query is provided
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
  await Product.updateOne(
    { _id: productId },
    {
      $set: productInfo,
    },
  );
  return getProductById(productId); // returning the product with updated field values
};

const deleteAProduct = async (productId: string) => {
  const productAlreadyDeleted = await getProductById(productId);
  if (!productAlreadyDeleted) {
    throw new Error('Product has already been deleted.');
  }
  const result = await Product.deleteOne({ _id: productId });
  return result;
};

export const productServices = {
  insertProductIntoDB,
  getAllProducts,
  getProductById,
  updateProductInfo,
  deleteAProduct,
};
