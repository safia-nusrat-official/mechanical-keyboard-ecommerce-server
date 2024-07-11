import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './modules/product/product.route';
import { orderRoutes } from './modules/orders/order.routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandlers';
import { notFoundError } from './app/middlewares/notFoundErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Key Wizards.');
});

// middlewares
app.use(globalErrorHandler);
app.use(notFoundError);

export default app;
