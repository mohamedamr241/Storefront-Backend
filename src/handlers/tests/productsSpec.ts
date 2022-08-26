import { product } from '../../types/products.type';
import supertest from 'supertest';
import client from '../../utils/database';
import app from '../../index';
import { token } from './usersSpec';

const testing = supertest(app);

describe('products API End point', () => {
  const newpro: product = {
    name: 'OPPO RENO F2',
    price: '5500.35',
  };
  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      'DELETE FROM products;ALTER SEQUENCE products_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
  describe('testing CRUD method', () => {
    it('create product method', async () => {
      const res = await testing
        .post('/createProduct')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'OPPO RENO F2', price: '5500.35' });

      expect(res.status).toBe(200);
      const { name, price } = res.body.data;
      expect(name).toBe(newpro.name);
      expect(price).toBe(newpro.price);
    });
    it('gell all products', async () => {
      const res = await testing
        .get('/products')
        .set('content-type', 'application/json');

      expect(res.status).toBe(200);
      expect(res.body.data[0].name).toBe(newpro.name);
      expect(res.body.data[0].price).toBe(newpro.price);
    });
    it('get specific product', async () => {
      const res = await testing
        .get('/products:id')
        .set('content-type', 'application/json')
        .send({ id: '1' });

      expect(res.status).toBe(200);
      const { name, price } = res.body.data;
      expect(name).toBe(newpro.name);
      expect(price).toBe(newpro.price);
    });
    it('update product method', async () => {
      const res = await testing
        .put('/updateProduct')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: '1', name: 'IPHONE 13', price: '25000.00' });

      expect(res.status).toBe(200);
      const { name, price } = res.body.data;
      expect(name).toBe('IPHONE 13');
      expect(price).toBe('25000.00');
    });
    it('delete product method', async () => {
      const res = await testing
        .delete('/deleteProduct')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: '1' });

      expect(res.status).toBe(200);
      const { name, price } = res.body.data;
      expect(name).toBe('IPHONE 13');
      expect(price).toBe('25000.00');
    });
  });
});
