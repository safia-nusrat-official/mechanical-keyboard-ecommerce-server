import { Request, Response } from 'express';
import { productServices } from './product.services';
import {
  createProductValidation,
  updateProductValidation,
} from './product.validation';
import { TProduct, TUpdatedProduct } from './product.interface';
import { catchAsync } from '../../app/utils/catchAsync';
import { sendResponse } from '../../app/utils/sendResponse';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.insertProductIntoDB(req.body);
  sendResponse(
    {
      success: true,
      statusCode: 200,
      message: 'Product created successfully!',
      data: result,
    },
    res,
  );
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.getAllProducts(req.query);
  sendResponse(
    {
      success: true,
      statusCode: 200,
      message: result.length
        ? 'Products fetched successfully!'
        : 'No data found.',
      data: result,
    },
    res,
  );
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.productId;
  const result = await productServices.getProductById(id);

  sendResponse(
    {
      success: true,
      message: 'Product fetched successfully!',
      data: result,
      statusCode: 200,
    },
    res,
  );
});

const updateProductInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.updateProductInfo(
    req.params.productId,
    req.body,
  );

  sendResponse(
    {
      success: true,
      message: 'Product updated successfully!',
      data: result,
      statusCode: 200,
    },
    res,
  );
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const result = await productServices.deleteAProduct(productId);

  sendResponse({
    success: true,
    message: 'Product deleted successfully!',
    data: result,
    statusCode:200
  }, res);
});
export const productControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProductInfo,
};
