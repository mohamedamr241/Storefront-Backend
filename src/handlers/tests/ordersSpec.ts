import { order } from '../../types/orders.type';
import { usersCollection } from '../../models/users';
import { user } from '../../types/users.type';
import supertest from 'supertest';
import client from '../../utils/database';
import app from '../../index';
import { token } from './usersSpec';
import { product } from '../../types/products.type';
import { productStore } from '../../models/products';

const users = new usersCollection();
const testing = supertest(app);
const store = new productStore();

describe('Orders API End Point', () => {
  const neword: order = {
    status: 'active',
    user_id: '1',
  };
  const Users: user = {
    username: 'mohamedamr241',
    firstname: 'Mohamed',
    lastname: 'Amr',
    password: 'mohamed123',
  };
  const newpro: product = {
    name: 'OPPO RENO F2',
    price: '5500.35',
  };
  beforeAll(async () => {
    await users.create(Users);
    await store.Create(newpro);
  });
  afterAll(async () => {
    const connection = await client.connect();
    const sql1 = 'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
    const sql2 =
      'DELETE FROM orders;ALTER SEQUENCE orders_id_seq RESTART WITH 1';
    const sql3 =
      'DELETE FROM products;ALTER SEQUENCE products_id_seq RESTART WITH 1';
    const sql4 =
      'DELETE FROM orders_products;ALTER SEQUENCE orders_products_id_seq RESTART WITH 1';
    await connection.query(sql4);
    await connection.query(sql3);
    await connection.query(sql2);
    await connection.query(sql1);
    connection.release();
  });
  describe('testing CRUD methods', () => {
    it('creating order method', async () => {
      const res = await testing
        .post('/createOrders')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(neword);
      expect(res.status).toBe(200);
      const { user_id, status } = res.body.data;
      expect(status).toBe('active');
      expect(user_id).toBe('1');
    });
    it('getting all orders', async () => {
      const res = await testing
        .get('/orders')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data[0].status).toBe('active');
      expect(res.body.data[0].user_id).toBe('1');
    });
    it('get specific order method', async () => {
      const res = await testing
        .get('/orders:id')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: '1' });

      expect(res.status).toBe(200);
      const { user_id, status } = res.body.data;
      expect(status).toBe('active');
      expect(user_id).toBe('1');
    });
    it('update order method', async () => {
      const res = await testing
        .put('/updateOrder')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: '1', status: 'complete' });

      expect(res.status).toBe(200);
      const { user_id, status } = res.body.data;
      expect(status).toBe('complete');
      expect(user_id).toBe('1');
    });
    it('adding product to order', async () => {
      const res = await testing
        .post('/orders:id/products')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ quantity: '5', orderId: '1', productId: '1' });

      expect(res.status).toBe(200);
      const { id, product_id, quantity, order_id } = res.body.data;
      expect(id).toBe(1);
      expect(product_id).toBe('1');
      expect(quantity).toBe(5);
      expect(order_id).toBe('1');
    });
    it('delete order method', async () => {
      const connection = await client.connect();
      const sql4 =
        'DELETE FROM orders_products;ALTER SEQUENCE orders_products_id_seq RESTART WITH 1';
      await connection.query(sql4);
      connection.release();
      const res = await testing
        .delete('/deleteOrder')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: '1' });
      expect(res.status).toBe(200);

      const { user_id, status } = res.body.data;
      expect(status).toBe('complete');
      expect(user_id).toBe('1');
    });
  });
});
