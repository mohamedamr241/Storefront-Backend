import { usersCollection } from '../../models/users';
import { user } from '../../types/users.type';
import supertest from 'supertest';
import client from '../../utils/database';
import app from '../../index';
import jwt from 'jsonwebtoken';

const users = new usersCollection();
const testing = supertest(app);
const token = jwt.sign(
  { username: 'mohamedamr241', firstname: 'Mohamed', lastname: 'Amr' },
  process.env.TOKEN_SECRET as string
);
export { token };

describe('User API End Point', () => {
  const Users: user = {
    username: 'mohamedamr241',
    firstname: 'Mohamed',
    lastname: 'Amr',
    password: 'mohamed123',
  };
  beforeAll(async () => {
    await users.create(Users);
  });
  afterAll(async () => {
    const connection = await client.connect();
    const sql = 'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
  describe('authentication method', () => {
    it('authenticating user and get token', async () => {
      const res = await testing
        .post('/authenicateUser')
        .set('content-type', 'application/json')
        .send({
          username: 'mohamedamr241',
          password: 'mohamed123',
        });
      expect(res.status).toBe(200);
      const { id, username, firstname, lastname } = res.body.data;
      expect(id).toBe(1);
      expect(username).toBe(Users.username);
      expect(firstname).toBe(Users.firstname);
      expect(lastname).toBe(Users.lastname);
    });
  });
  describe('testing CRUD End Points', () => {
    it('should create new user', async () => {
      const res = await testing
        .post('/createUser')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'ahmedamr241',
          firstname: 'ahmed',
          lastname: 'Amr',
          password: 'ahmed123',
        } as user);
      expect(res.status).toBe(200);
      const { username } = res.body.data.User;
      expect(username).toBe('ahmedamr241');
    });
    it('should get all users', async () => {
      const res = await testing
        .get('/users')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data[0].username).toBe('mohamedamr241');
      expect(res.body.data[1].username).toBe('ahmedamr241');
    });
    it('should get specific users', async () => {
      const res = await testing
        .get('/getUser')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ username: 'ahmedamr241' });

      expect(res.status).toBe(200);
      expect(res.body.data.username).toBe('ahmedamr241');
      expect(res.body.data.firstname).toBe('ahmed');
      expect(res.body.data.lastname).toBe('Amr');
    });
    it('update user method', async () => {
      const res = await testing
        .put('/updateuser')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: '1',
          username: 'mohamedamr241',
          firstname: 'mohamed',
          lastname: 'Amr',
          password: 'mohamed123',
        });

      expect(res.status).toBe(200);
      const { username, firstname, lastname } = res.body.data;
      expect(username).toBe('mohamedamr241');
      expect(firstname).toBe('mohamed');
      expect(lastname).toBe('Amr');
    });
    it('delete user method', async () => {
      const res = await testing
        .delete('/deleteuser')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: '1' });

      expect(res.status).toBe(200);
      const { username, firstname, lastname } = res.body.data;
      expect(username).toBe('mohamedamr241');
      expect(firstname).toBe('mohamed');
      expect(lastname).toBe('Amr');
    });
  });
});
