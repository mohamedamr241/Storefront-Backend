import client from '../utils/database';
import bcrypt from 'bcrypt';
import { user } from '../types/users.type';

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;

export class usersCollection {
  async index(): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT username,firstName,lastName  FROM Users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get users: ${err}`);
    }
  }
  async create(newuser: user): Promise<user> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO Users(username,firstName,lastName,password) VALUES ($1,$2,$3,$4) RETURNING username';
      const hash = bcrypt.hashSync(
        (newuser.password as string) + (BCRYPT_PASSWORD as string),
        parseInt(SALT_ROUNDS as string)
      );
      const result = await conn.query(sql, [
        newuser.username,
        newuser.firstname,
        newuser.lastname,
        hash,
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable to create user ${newuser.username}`);
    }
  }
  async getUser(UserName: string): Promise<user> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT username,firstName,lastName FROM Users where username=($1)';
      const result = await conn.query(sql, [UserName]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`unable to catch user ${UserName}`);
    }
  }
  async authenticate(username: string, password: string): Promise<user | null> {
    const conn = await client.connect();
    const sql = 'SELECT password from Users where username = ($1)';
    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (
        bcrypt.compareSync(
          password + (BCRYPT_PASSWORD as string),
          user.password
        )
      ) {
        const userInfo = await conn.query(
          'SELECT id,username,firstName,lastName  FROM Users WHERE username=($1)',
          [username]
        );
        return userInfo.rows[0];
      }
    }
    conn.release();
    return null;
  }
  async update(id: string, newuser: user): Promise<user> {
    try {
      const sql =
        'UPDATE Users SET firstname=($1),lastname=($2),username=($3),password=($4) WHERE id=($5) RETURNING *';

      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        (newuser.password as string) + (BCRYPT_PASSWORD as string),
        parseInt(SALT_ROUNDS as string)
      );

      const result = await conn.query(sql, [
        newuser.firstname,
        newuser.lastname,
        newuser.username,
        hash,
        id,
      ]);

      const updateduser = result.rows[0];

      conn.release();

      return updateduser;
    } catch (err) {
      throw new Error(`Could not update user: ${id}. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<user> {
    try {
      const sql = 'DELETE FROM Users WHERE id=($1) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
