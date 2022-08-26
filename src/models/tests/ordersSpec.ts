import client from '../../utils/database';
import { order, order_product } from '../../types/orders.type';
import { Orders_reg } from '../orders';
import { usersCollection } from '../users';
import { user } from '../../types/users.type';
import { productStore } from '../products';
import { product } from '../../types/products.type';

const Order = new Orders_reg();
const users = new usersCollection();
const store = new productStore();

describe('orders tesing', () => {
  describe('checking existance of methods', () => {
    it('should have an index method', () => {
      expect(Order.index).toBeDefined();
    });
    it('should have an index method', () => {
      expect(Order.Create).toBeDefined();
    });
    it('should have an index method', () => {
      expect(Order.addProduct).toBeDefined();
    });
    it('should have an index method', () => {
      expect(Order.delete).toBeDefined();
    });
    it('should have an index method', () => {
      expect(Order.show).toBeDefined();
    });
    it('should have an index method', () => {
      expect(Order.update).toBeDefined();
    });
  });
  describe('create order testing', () => {
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
    beforeAll(async () => {
      await users.create(Users);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql1 =
        'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
      const sql2 =
        'DELETE FROM orders;ALTER SEQUENCE orders_id_seq RESTART WITH 1';
      await connection.query(sql2);
      await connection.query(sql1);
      connection.release();
    });
    it('creating order functionality should return order', async () => {
      const createorder = await Order.Create(neword);
      expect(createorder?.status).toBe(neword.status);
      expect(createorder?.user_id).toBe(neword.user_id);
    });
  });
  describe('getting all orders method', () => {
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
    beforeAll(async () => {
      await users.create(Users);
      await Order.Create(neword);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql1 =
        'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
      const sql2 =
        'DELETE FROM orders;ALTER SEQUENCE orders_id_seq RESTART WITH 1';
      await connection.query(sql2);
      await connection.query(sql1);
      connection.release();
    });
    it('getting all orders functionality should return all orders', async () => {
      const allorders = await Order.index();
      expect(allorders[0].status).toBe(neword.status);
      expect(allorders[0].user_id).toBe(neword.user_id);
    });
  });
  describe('getting specific order method', () => {
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
    beforeAll(async () => {
      await users.create(Users);
      await Order.Create(neword);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql1 =
        'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
      const sql2 =
        'DELETE FROM orders;ALTER SEQUENCE orders_id_seq RESTART WITH 1';
      await connection.query(sql2);
      await connection.query(sql1);
      connection.release();
    });
    it('getting specific order functionality should return an order', async () => {
      const anorders = await Order.show('1');
      expect(anorders?.status).toBe(neword.status);
      expect(anorders?.user_id).toBe(neword.user_id);
    });
  });
  describe('deleting specific order method', () => {
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
    beforeAll(async () => {
      await users.create(Users);
      await Order.Create(neword);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql1 =
        'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
      const sql2 =
        'DELETE FROM orders;ALTER SEQUENCE orders_id_seq RESTART WITH 1';
      await connection.query(sql2);
      await connection.query(sql1);
      connection.release();
    });
    it('deleting an order functionality should return an order', async () => {
      const deletedorders = await Order.delete('1');
      expect(deletedorders?.status).toBe(neword.status);
      expect(deletedorders?.user_id).toBe(neword.user_id);
    });
  });
  describe('update specific order method', () => {
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
    beforeAll(async () => {
      await users.create(Users);
      await Order.Create(neword);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql1 =
        'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
      const sql2 =
        'DELETE FROM orders;ALTER SEQUENCE orders_id_seq RESTART WITH 1';
      await connection.query(sql2);
      await connection.query(sql1);
      connection.release();
    });
    it('updating an order functionality should return an order', async () => {
      const updatedorders = await Order.update('1', 'complete');
      expect(updatedorders?.status).toBe('complete');
      expect(updatedorders?.user_id).toBe(neword.user_id);
    });
  });
  describe('adding product to an order method', () => {
    const neword: order = {
      status: 'active',
      user_id: '1',
    };
    const newpro: product = {
      name: 'OPPO RENO F2',
      price: '5500.35',
    };
    const Users: user = {
      username: 'mohamedamr241',
      firstname: 'Mohamed',
      lastname: 'Amr',
      password: 'mohamed123',
    };
    const productToOrder: order_product = {
      product_id: '1',
      order_id: '1',
      quantity: 5,
    };
    beforeAll(async () => {
      await users.create(Users);
      await Order.Create(neword);
      await store.Create(newpro);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql1 =
        'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
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
    it('adding product to an order functionality should return an order', async () => {
      const cart = await Order.addProduct(
        '5',
        productToOrder.order_id,
        productToOrder.product_id
      );
      expect(cart?.order_id).toBe(productToOrder.order_id);
      expect(cart?.product_id).toBe(productToOrder.product_id);
      expect(cart?.quantity).toBe(productToOrder.quantity);
    });
  });
});
