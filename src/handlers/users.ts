import express, { Request, Response } from 'express';
import { usersCollection } from '../models/users';
import jwt from 'jsonwebtoken';
import {
  authenticationvalidation,
  createUserVlidation,
  deletevalid,
  updateuser,
  getuservalid,
} from '../verifications/users.verifications';
import { validateTokenMiddleware } from '../middlewares/verifyAuthToken';
import { user } from '../types/users.type';

const users = new usersCollection();
const { TOKEN_SECRET } = process.env;

const create_user = async (req: Request, res: Response) => {
  try {
    const newuser: user = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const User = await users.create(newuser);
    const token = jwt.sign({ user: User }, TOKEN_SECRET as string);
    res.json({
      status: 'success',
      data: { User, token },
      message: 'successfully creating user',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const authentication = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const pass: string = req.body.password;
    const user = await users.authenticate(username, pass);
    const token = jwt.sign({ user: user }, TOKEN_SECRET as string);
    if (user) {
      res.json({
        status: 'success',
        data: { ...user, token },
        message: 'successfully authenticating user',
      });
    } else {
      res.json({
        status: 'failed',
        data: {},
        message: 'failed to authenticate user',
      });
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const index = async (req: Request, res: Response) => {
  try {
    const Users = await users.index();
    res.json({
      status: 'success',
      data: { ...Users },
      message: 'successfully getting all users',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const getUser = async (req: Request, res: Response) => {
  try {
    const UserName: string = req.body.username;
    const theuser = await users.getUser(UserName);
    const token = jwt.sign({ user: theuser }, TOKEN_SECRET as string);
    res.json({
      status: 'success',
      data: { ...theuser, token },
      message: 'successfully getting this users',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const newuser: user = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const Users = await users.update(req.body.id, newuser);
    res.json({
      status: 'success',
      data: { ...Users },
      message: 'successfully updating user',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const destroy = async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;
    const deleted = await users.delete(id);
    res.json({
      status: 'success',
      data: { ...deleted },
      message: 'successfully deleting user',
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const users_routes = (app: express.Application) => {
  app.get('/users', validateTokenMiddleware, index);
  app.post('/createUser', createUserVlidation, create_user);
  app.post('/authenicateUser', authenticationvalidation, authentication);
  app.get('/getUser', getuservalid, validateTokenMiddleware, getUser);
  app.put('/updateuser', updateuser, validateTokenMiddleware, update);
  app.delete('/deleteuser', deletevalid, validateTokenMiddleware, destroy);
};
export default users_routes;
