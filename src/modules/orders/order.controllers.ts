import { Request, Response } from 'express';
import { orderServices } from './order.services';
import { orderValidation } from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const { error, value } = orderValidation.validate(order);
    if (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: error.message || 'Order created succesfully!'
      });
      return
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

export const orderControllers = {
  createOrder,
};
