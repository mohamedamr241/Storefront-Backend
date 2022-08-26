import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationheader = req.get('Authorization');
    if (authorizationheader) {
      const bearer = authorizationheader.split(' ')[0].toLowerCase();
      const token = authorizationheader.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(token, process.env.TOKEN_SECRET as string);
        if (decode) {
          next();
        } else {
          res.status(401);
          res.json(`invalid token`);
          return;
        }
      } else {
        res.status(401);
        res.json(`invalid token`);
        return;
      }
    } else {
      res.status(401);
      res.json(`invalid token`);
      return;
    }
  } catch (error) {
    res.status(401);
    res.json(`invalid token ${error}`);
    return;
  }
};
