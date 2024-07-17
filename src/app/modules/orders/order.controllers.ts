import { Request, Response } from 'express';
import { orderServices } from './order.services';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.insertOrderintoDB(req.body);
  sendResponse(
    {
      success: true,
      message: 'Order created succesfully!',
      data: result,
      statusCode: 200
    },
    res,
  );
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.getAllOrdersFromDB(req.query);
  sendResponse(
    {
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
      statusCode: 200,
    },
    res,
  );
});

export const orderControllers = {
  getAllOrders,
  createOrder,
};
