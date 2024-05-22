import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './modules/product/product.route';
import { orderRoutes } from './modules/orders/order.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Home page.');
});

app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong',
    });
  }
});
export default app;
