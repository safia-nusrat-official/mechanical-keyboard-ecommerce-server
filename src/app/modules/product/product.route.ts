import express from 'express';
import { productControllers } from './product.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { createProductValidation, updateProductValidation } from './product.validation';

const productRoutes = express.Router();

productRoutes.post(
  '/',
  validateRequest(createProductValidation),
  productControllers.createProduct,
);

productRoutes.get('/', productControllers.getAllProducts);
productRoutes.get('/:productId', productControllers.getProductById);

productRoutes.put(
  '/:productId',
  validateRequest(updateProductValidation),
  productControllers.updateProductInfo,
);

productRoutes.delete('/:productId', productControllers.deleteProduct);

export default productRoutes;
