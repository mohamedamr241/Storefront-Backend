import express, { Request, Response } from 'express';
import { productStore } from '../models/products';
import { validateTokenMiddleware } from '../middlewares/verifyAuthToken';
import { product } from '../types/products.type';
import {
  getproductvalid,
  createvalidpro,
  updateprovalid,
  deleteprovalid,
} from '../verifications/products.verification';
const store = new productStore();

const index = async (_req: Request, res: Response) => {
  try {
    const item = await store.index();
    res.json({
      status: 'success',
      data: { ...item },
      message: 'successfully getting all products',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;
    const Product = await store.show(id);
    res.json({
      status: 'success',
      data: { ...Product },
      message: 'successfully getting this product',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const Product: product = {
      name: req.body.name,
      price: req.body.price,
    };

    const newProduct = await store.Create(Product);
    res.json({
      status: 'success',
      data: { ...newProduct },
      message: 'successfully creating this product',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const change = async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;
    const name: string = req.body.name;
    const price: string = req.body.price;

    const updateProduct = await store.update(id, name, price);
    res.json({
      status: 'success',
      data: { ...updateProduct },
      message: 'successfully updating this product',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const destroy = async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;
    const deleted = await store.delete(id);
    res.json({
      status: 'success',
      data: { ...deleted },
      message: 'successfully deleting this product',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const mythical_weapons_routes = (app: express.Application) => {
  app.get('/products', index);
  app.post('/createProduct', createvalidpro, validateTokenMiddleware, create);
  app.get('/products:id', getproductvalid, show);
  app.delete(
    '/deleteProduct',
    deleteprovalid,
    validateTokenMiddleware,
    destroy
  );
  app.put('/updateProduct', updateprovalid, validateTokenMiddleware, change);
};
export default mythical_weapons_routes;
