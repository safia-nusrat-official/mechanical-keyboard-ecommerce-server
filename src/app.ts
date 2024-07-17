import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandlers';
import { notFoundError } from './app/middlewares/notFoundErrorHandler';
import productRoutes from './app/modules/product/product.route';
import { orderRoutes } from './app/modules/orders/order.routes';
import { productControllers } from './app/modules/product/product.controller';
import Stripe from 'stripe';
import config from './app/config';

const app: Application = express();
const stripe = new Stripe(config.stripe_secret_key as string);
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
  }),
);

app.get('/api/products-count', productControllers.getProductsCount);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Key Wizards.');
});

app.post('/api/create-payment-intent', async (req, res) => {
  console.log(req.body);
  const { totalPrice } = req.body;
  const amount = Number(totalPrice) * 100;
  console.log(amount);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// middlewares
app.use(globalErrorHandler);
app.use(notFoundError);

export default app;
