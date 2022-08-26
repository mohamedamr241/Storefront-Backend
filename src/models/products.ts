import client from '../utils/database';
import { product } from '../types/products.type';

export class productStore {
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM Products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get Products: ${err}`);
    }
  }
  async Create(piece: product): Promise<product> {
    try {
      const sql =
        'INSERT INTO Products(name, price) VALUES($1, $2) RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [piece.name, piece.price]);

      const article = result.rows[0];

      conn.release();

      return article;
    } catch (err) {
      throw new Error(`Could not add product ${piece.name}. Error: ${err}`);
    }
  }
  async show(id: string): Promise<product> {
    try {
      const sql = 'SELECT * FROM Products WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get this product: ${id}. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<product> {
    try {
      const sql = 'DELETE FROM Products WHERE id=($1) RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const article = result.rows[0];

      conn.release();

      return article;
    } catch (err) {
      throw new Error(`Could not delete this product: ${id}. Error: ${err}`);
    }
  }
  async update(id: string, Name: string, Price: string): Promise<product> {
    try {
      const sql =
        'UPDATE Products set name=($1), price=($2) WHERE id=($3) RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [Name, Price, id]);

      const pro = result.rows[0];

      conn.release();

      return pro;
    } catch (err) {
      throw new Error(`Could not update this product: ${id}. Error: ${err}`);
    }
  }
}
