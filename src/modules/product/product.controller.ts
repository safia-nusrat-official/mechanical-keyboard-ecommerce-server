import { Request, Response } from 'express';
import { productServices } from './product.services';
import { productValidation, updatedProductValidation } from './product.validation';
import { TProduct, TUpdatedProduct } from './product.interface';
import { ZodParsedType } from 'zod';

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

const updateProductInfo = async (req:Request, res:Response) => {
  try {
    const newProductInfo:Partial<TProduct> = req.body
    const productId = req.params.productId
    const productInfoIsValid = updatedProductValidation.safeParse(newProductInfo)

    if(!productInfoIsValid.success){
      res.status(500).send({
        success:false,
        message:"Do not provide any property that doesnot exist on the original product.",
      })
      return 
    }

    if(!Object.keys(productInfoIsValid.data).length){
      res.status(400).send({
        success:false,
        message:"There was nothing to update because you either provided an empty object or a property that doesnot exist in the original product."
      })
      return
    }
    const productInfo:TUpdatedProduct = productInfoIsValid.data ||newProductInfo
    const result = await productServices.updateProductInfo(productId, productInfo)

    res.status(200).send({
      success:true,
      message:"Product updated successfully!",
      data:result
    })
  } catch (error:any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.reason ? `Invalid product id!` : 'Failed to upate product information.',
    });
  }
}
export const productControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductInfo
};
