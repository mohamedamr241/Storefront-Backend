import { Request, Response, NextFunction } from 'express';

export const authenticationvalidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorsBag: string[] = [];

  const { username, password } = req.body;
  if (!username) errorsBag.push('username is required');
  if (!password) errorsBag.push('password is required');

  if (errorsBag.length) {
    res.status(400).send({
      message: 'invalid data',
      error: errorsBag,
    });
    return;
  }
  next();
};

export const createUserVlidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorsBag: string[] = [];

  const { username, firstname, lastname, password } = req.body;
  if (!username) {
    errorsBag.push('username is required');
  } else {
    if (username.length < 4)
      errorsBag.push('username must be at least 4 characters');
    if (username.length > 20)
      errorsBag.push('username must be at most 20 characters');
  }
  if (!password) {
    errorsBag.push('password is required');
  } else {
    if (password.length < 8)
      errorsBag.push('password must be at least 8 characters');
    if (password.length > 20)
      errorsBag.push('password must be at most 20 characters');
  }
  if (!firstname) errorsBag.push('firstname is required');
  else {
    if (firstname.length < 3)
      errorsBag.push('firstname must be at least 3 characters');
    if (firstname.length > 15)
      errorsBag.push('firstname must be at most 15 characters');
  }
  if (!lastname) errorsBag.push('lastname is required');
  else {
    if (lastname.length < 3)
      errorsBag.push('lastname must be at least 3 characters');
    if (lastname.length > 15)
      errorsBag.push('lastname must be at most 15 characters');
  }

  if (errorsBag.length) {
    res.status(400).send({
      message: 'invalid data',
      error: errorsBag,
    });
    return;
  }
  next();
};

export const getuservalid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorsBag: string[] = [];

  const { username } = req.body;

  if (!username) errorsBag.push('username is required');
  if (errorsBag.length) {
    res.status(400).send({
      message: 'invalid data',
      error: errorsBag,
    });
    return;
  }
  next();
};

export const updateuser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorsBag: string[] = [];

  const { id, username, firstname, lastname, password } = req.body;

  if (!id) errorsBag.push('id is required');
  if (!username) errorsBag.push('username is required');
  if (!password) errorsBag.push('password is required');
  if (!firstname) errorsBag.push('firstname is required');
  if (!lastname) errorsBag.push('lastname is required');

  if (errorsBag.length) {
    res.status(400).send({
      message: 'invalid data',
      error: errorsBag,
    });
    return;
  }
  next();
};

export const deletevalid = (
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
