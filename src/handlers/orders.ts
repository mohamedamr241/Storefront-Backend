import express, { Request, Response } from 'express';
import { Orders_reg } from '../models/orders';
import { order } from '../types/orders.type';
import { validateTokenMiddleware } from '../middlewares/verifyAuthToken';
import {
  showordervalid,
  createordervalid,
  deleteordervalid,
  updateordervalid,
  addProductToOrderValid,
} from '../verifications/orders.verification';

const Order = new Orders_reg();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.index();
    res.json({
      status: 'success',
      data: { ...orders },
      message: 'successfully getting all orders',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;
    const order = await Order.show(id);
    res.json({
      status: 'success',
      data: { ...order },
      message: 'successfully getting this order',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const orders: order = {
      status: 'active',
      user_id: req.body.user_id,
    };
    const newOrder = await Order.Create(orders);
    res.json({
      status: 'success',
      data: { ...newOrder },
      message: 'successfully creating order',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const destroy = async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;
    const deleted = await Order.delete(id);
    res.json({
      status: 'success',
      data: { ...deleted },
      message: 'successfully deleting order',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const change = async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;
    const status: string = req.body.status;

    const updateOrder = await Order.update(id, status);
    res.json({
      status: 'success',
      data: { ...updateOrder },
      message: 'successfully updating order',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const addproduct = async (req: Request, res: Response) => {
  try {
    const quantity: string = req.body.quantity;
    const orderId: string = req.body.orderId;
    const productId: string = req.body.productId;
    const newOrder = await Order.addProduct(quantity, orderId, productId);
    res.json({
      status: 'success',
      data: { ...newOrder },
      message: 'successfully adding product to order',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const order_routes = (app: express.Application) => {
  app.get('/orders', validateTokenMiddleware, index);
  app.get('/orders:id', showordervalid, validateTokenMiddleware, show);
  app.post('/createOrders', createordervalid, validateTokenMiddleware, create);
  app.put('/updateOrder', updateordervalid, validateTokenMiddleware, change);
  app.delete(
    '/deleteOrder',
    deleteordervalid,
    validateTokenMiddleware,
    destroy
  );
  app.post(
    '/orders:id/products',
    addProductToOrderValid,
    validateTokenMiddleware,
    addproduct
  );
};
export default order_routes;
