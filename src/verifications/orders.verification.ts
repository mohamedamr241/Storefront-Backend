import { Request, Response, NextFunction } from 'express';

export const showordervalid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorsBag: string[] = [];

  const { id } = req.body;

  if (!id) errorsBag.push('id is required');

  if (errorsBag.length) {
    res.status(400).send({
      message: 'invalid data',
      error: errorsBag,
    });
    return;
  }
  next();
};

export const createordervalid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorsBag: string[] = [];

  const { user_id } = req.body;

  if (!user_id) errorsBag.push('user id is required');

  if (errorsBag.length) {
    res.status(400).send({
      message: 'invalid data',
      error: errorsBag,
    });
    return;
  }
  next();
};

export const deleteordervalid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorsBag: string[] = [];

  const { id } = req.body;

  if (!id) errorsBag.push('id is required');

  if (errorsBag.length) {
    res.status(400).send({
      message: 'invalid data',
      error: errorsBag,
    });
    return;
  }
  next();
};

export const updateordervalid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorsBag: string[] = [];

  const { id, status } = req.body;

  if (!id) errorsBag.push('id is required');
  if (!status) errorsBag.push('status is required');

  if (errorsBag.length) {
    res.status(400).send({
      message: 'invalid data',
      error: errorsBag,
    });
    return;
  }
  next();
};

export const addProductToOrderValid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorsBag: string[] = [];

  const { quantity, orderId, productId } = req.body;

  if (!quantity) errorsBag.push('quantity is required');
  if (!orderId) errorsBag.push('orderId is required');
  if (!productId) errorsBag.push('productId is required');

  if (errorsBag.length) {
    res.status(400).send({
      message: 'invalid data',
      error: errorsBag,
    });
    return;
  }
  next();
};
