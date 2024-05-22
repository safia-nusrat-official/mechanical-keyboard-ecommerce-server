import { Request, Response } from 'express';
import { orderServices } from './order.services';
import { orderValidation } from './order.validation';
import Joi from 'joi';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const { error, value } = orderValidation.validate(order);
    if (error) {
      res.status(500).send({
        success: false,
        message: 'Missing required order properties!',
      });
      return;
    }
    const result = await orderServices.insertOrderintoDB(value);
    res.status(200).send({
      success: true,
      message: 'Order created succesfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Unexpected Error',
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const searchEmail = req.query.email;
    // running conditional logic to return orders with specific email
    if (searchEmail && searchEmail?.toString().trim()) {
      const isValidEmail = Joi.string().email().message('Invalid email');
      const { error, value: email } = isValidEmail.validate(
        searchEmail?.toString().trim(),
      );
      // checking if the string query provided is a valid email
      if (error) {
        res.status(500).send({
          success: true,
          message: error.message || 'unexpected error',
        });
        return;
      }
      const result = await orderServices.getAllOrdersFromDB(email);
      // if no order with the given email has been created
      if (!result.length) {
        res.status(500).send({
          success: false,
          message: `Order not found`,
        });
        return;
      }
      res.status(200).send({
        success: true,
        message: `Orders fetched successfully for user email: ${email}!`,
        data: result,
      });
      return;
    }
    // if no email is provided, sending all the orders placed.
    const result = await orderServices.getAllOrdersFromDB();
    res.status(200).send({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'unexpected error',
    });
  }
};

export const orderControllers = {
  getAllOrders,
  createOrder,
};
