import { Request, Response, NextFunction } from 'express';

export const getproductvalid = (
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
export const createvalidpro = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorsBag: string[] = [];

  const { name, price } = req.body;

  if (!name) errorsBag.push('name is required');
  if (!price) errorsBag.push('price is required');

  if (errorsBag.length) {
    res.status(400).send({
      message: 'invalid data',
      error: errorsBag,
    });
    return;
  }
  next();
};

export const updateprovalid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorsBag: string[] = [];

  const { id, name, price } = req.body;

  if (!id) errorsBag.push('id is required');
  if (!name) errorsBag.push('name is required');
  if (!price) errorsBag.push('price is required');

  if (errorsBag.length) {
    res.status(400).send({
      message: 'invalid data',
      error: errorsBag,
    });
    return;
  }
  next();
};

export const deleteprovalid = (
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
