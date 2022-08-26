import client from '../../utils/database';
import { productStore } from '../products';
import { product } from '../../types/products.type';

const store = new productStore();

describe('Products Testing', () => {
  describe('check methods existance', () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });
    it('should have an Create method', () => {
      expect(store.Create).toBeDefined();
    });
    it('should have an delete method', () => {
      expect(store.delete).toBeDefined();
    });
    it('should have an show method', () => {
      expect(store.show).toBeDefined();
    });
    it('should have an update method', () => {
      expect(store.update).toBeDefined();
    });
  });
  describe('create products testing', () => {
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
    it('creating product functionality should return product', async () => {
      const createNewpro = await store.Create(newpro);
      expect(createNewpro?.name).toBe(newpro.name);
      expect(createNewpro?.price).toBe(newpro.price);
    });
  });
  describe('getting all products testing', () => {
    const newpro: product = {
      name: 'OPPO RENO F2',
      price: '5500.35',
    };
    beforeAll(async () => {
      await store.Create(newpro);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql =
        'DELETE FROM products;ALTER SEQUENCE products_id_seq RESTART WITH 1';
      await connection.query(sql);
      connection.release();
    });
    it('index method should return a list of products', async () => {
      const result = await store.index();
      expect(result[0].name).toBe(newpro.name);
      expect(result[0].price).toBe(newpro.price);
    });
  });
  describe('show specific product testing', () => {
    const newpro: product = {
      name: 'OPPO RENO F2',
      price: '5500.35',
    };
    beforeAll(async () => {
      await store.Create(newpro);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql =
        'DELETE FROM products;ALTER SEQUENCE products_id_seq RESTART WITH 1';
      await connection.query(sql);
      connection.release();
    });
    it('showing specific product functionality should return product', async () => {
      const showcNewpro = await store.show('1');
      expect(showcNewpro?.name).toBe(newpro.name);
      expect(showcNewpro?.price).toBe(newpro.price);
    });
  });
  describe('delete specific product testing', () => {
    const newpro: product = {
      name: 'OPPO RENO F2',
      price: '5500.35',
    };
    beforeAll(async () => {
      await store.Create(newpro);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql =
        'DELETE FROM products;ALTER SEQUENCE products_id_seq RESTART WITH 1';
      await connection.query(sql);
      connection.release();
    });
    it('deleting specific product functionality should return product', async () => {
      const showcNewpro = await store.delete('1');
      expect(showcNewpro?.name).toBe(newpro.name);
      expect(showcNewpro?.price).toBe(newpro.price);
    });
  });
  describe('update specific product testing', () => {
    const newpro: product = {
      name: 'OPPO RENO F2',
      price: '5500.35',
    };
    beforeAll(async () => {
      await store.Create(newpro);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql =
        'DELETE FROM products;ALTER SEQUENCE products_id_seq RESTART WITH 1';
      await connection.query(sql);
      connection.release();
    });
    it('updating specific product functionality should return product', async () => {
      const showcNewpro = await store.update('1', 'IPHONE 12 PRO', '20000.00');
      expect(showcNewpro?.name).toBe('IPHONE 12 PRO');
      expect(showcNewpro?.price).toBe('20000.00');
    });
  });
});
