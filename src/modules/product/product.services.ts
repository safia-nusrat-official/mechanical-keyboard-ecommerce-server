import { TProduct, TUpdatedProduct } from './product.interface';
import { Product } from './product.model';

const insertProductIntoDB = async (product: TProduct) => {
  const newProduct = new Product(product)
  const result = await newProduct.save();
  console.log(result)
  return result;
};

const getAllProducts = async (searchQuery?: string):Promise<Array<TProduct>> => {
  if (searchQuery) {
    const searchQueryRegex = new RegExp(`${searchQuery}`);
    const result = await Product.aggregate([
      {
        $unwind:"$variants"
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
  const productAlreadyDeleted = await getProductById(productId);
  if (!productAlreadyDeleted) {
    throw new Error('Product has already been deleted before.');
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
