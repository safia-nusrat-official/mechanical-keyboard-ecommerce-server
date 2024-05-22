import { Request, Response } from 'express';
import { productServices } from './product.services';
import { productValidation } from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const value = productValidation.safeParse(productData);
    if (!value.success) {
      return res.status(500).send({
        success: false,
        message: 'Invalid Data',
        errors: value.error.issues.map(
          (err) => `${err.message} for property '${err.path[0]}' `,
        ),
      });
    } else {
      const result = await productServices.insertProductIntoDB(value.data);
      res.status(200).send({
        success: true,
        message: 'Product created successfully!',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Unexpected error',
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProducts();
    res.status(200).send({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await productServices.getProductById(id);
    console.log(result);
    res.status(200).send({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.reason ? `Product doesnot exist` : 'Failed to fetch product',
    });
  }
};
export const productControllers = {
  createProduct,
  getAllProducts,
  getProductById,
};
