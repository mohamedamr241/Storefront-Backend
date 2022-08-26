import client from '../utils/database';
import { order, order_product } from '../types/orders.type';

export class Orders_reg {
  async index(): Promise<order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM Orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get orders ${err}`);
    }
  }
  async show(id: string): Promise<order> {
    try {
      const sql = 'SELECT * FROM Orders WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get this Order: ${id}. Error: ${err}`);
    }
  }
  async Create(neworder: order): Promise<order> {
    try {
      const sql =
        'INSERT INTO Orders(status, user_id) VALUES($1, $2) RETURNING status,user_id';
      const conn = await client.connect();

      const result = await conn.query(sql, [neworder.status, neworder.user_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add order. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<order> {
    try {
      const sql = 'DELETE FROM Orders WHERE id=($1) RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
  async update(id: string, status: string): Promise<order> {
    try {
      const sql = 'UPDATE Orders SET status=($1) WHERE id=($2) RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [status, id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not update this order: ${id}. Error: ${err}`);
    }
  }
  async addProduct(
    quantity: string,
    orderId: string,
    productId: string
  ): Promise<order_product> {
    try {
      const sql =
        'INSERT INTO Orders_Products(quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add order ${orderId}. Error: ${err}`);
    }
  }
}
