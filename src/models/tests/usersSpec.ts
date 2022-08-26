import client from '../../utils/database';
import { usersCollection } from '../users';
import { user } from '../../types/users.type';

const users = new usersCollection();

describe('Users Testing', () => {
  describe('check that all methods exist', () => {
    it('should have an authentication method', () => {
      expect(users.authenticate).toBeDefined();
    });
    it('should have an create method', () => {
      expect(users.create).toBeDefined();
    });
    it('should have an getUser method', () => {
      expect(users.getUser).toBeDefined();
    });
    it('should have an index method', () => {
      expect(users.index).toBeDefined();
    });
    it('should have an update method', () => {
      expect(users.update).toBeDefined();
    });
    it('should have an delete method', () => {
      expect(users.delete).toBeDefined();
    });
  });
  describe('Authentication logic', () => {
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
      const sql =
        'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
      await connection.query(sql);
      connection.release();
    });
    it("Authentication functionality should return user's info", async () => {
      const auth = await users.authenticate(Users.username, Users.password);
      expect(auth?.username).toBe(Users.username);
      expect(auth?.firstname).toBe(Users.firstname);
      expect(auth?.lastname).toBe(Users.lastname);
    });
    it('Authentication functionality should return null', async () => {
      const auth = await users.authenticate('omarsheta1976', 'omar123');
      expect(auth).toBe(null);
    });
  });
  describe('creating user method', () => {
    const newuser: user = {
      username: 'mohamedamr241',
      firstname: 'Mohamed',
      lastname: 'Amr',
      password: 'mohamed123',
    };
    afterAll(async () => {
      const connection = await client.connect();
      const sql =
        'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
      await connection.query(sql);
      connection.release();
    });
    it('creating user functionality should return user', async () => {
      const createNewUser = await users.create(newuser);
      expect(createNewUser?.username).toBe(newuser.username);
    });
  });
  describe('getting all users method', () => {
    const demouser: user = {
      username: 'mohamedamr241',
      firstname: 'Mohamed',
      lastname: 'Amr',
      password: 'mohamed123',
    };
    beforeAll(async () => {
      await users.create(demouser);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql =
        'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
      await connection.query(sql);
      connection.release();
    });
    it('getting user functionality should return all users', async () => {
      const allusers = await users.index();
      expect(allusers[0].username).toBe(demouser.username);
      expect(allusers[0].firstname).toBe(demouser.firstname);
      expect(allusers[0].lastname).toBe(demouser.lastname);
    });
  });
  describe('getting specific user method', () => {
    const Newuser: user = {
      username: 'mohamedamr241',
      firstname: 'Mohamed',
      lastname: 'Amr',
      password: 'mohamed123',
    };
    beforeAll(async () => {
      await users.create(Newuser);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql =
        'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
      await connection.query(sql);
      connection.release();
    });
    it('getting specific user functionality should return user', async () => {
      const getNewUser = await users.getUser(Newuser.username);
      expect(getNewUser?.username).toBe(Newuser.username);
      expect(getNewUser?.firstname).toBe(Newuser.firstname);
      expect(getNewUser?.lastname).toBe(Newuser.lastname);
    });
  });
  describe('update specific user testing', () => {
    const Newuser: user = {
      username: 'mohamedamr241',
      firstname: 'Mohamed',
      lastname: 'Amr',
      password: 'mohamed123',
    };
    const updateuser: user = {
      username: 'ahmedamr241',
      firstname: 'Ahmed',
      lastname: 'Amr',
      password: 'ahmed123',
    };
    beforeAll(async () => {
      await users.create(Newuser);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql =
        'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
      await connection.query(sql);
      connection.release();
    });
    it('updating specific user functionality should return user info', async () => {
      const updateddata = await users.update('1', updateuser);
      expect(updateddata?.firstname).toBe('Ahmed');
      expect(updateddata?.lastname).toBe('Amr');
      expect(updateddata?.username).toBe('ahmedamr241');
    });
  });
  describe('delete specific user testing', () => {
    const Newuser: user = {
      username: 'mohamedamr241',
      firstname: 'Mohamed',
      lastname: 'Amr',
      password: 'mohamed123',
    };
    beforeAll(async () => {
      await users.create(Newuser);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql =
        'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
      await connection.query(sql);
      connection.release();
    });
    it('deleting specific user functionality should return user', async () => {
      const deleteuser = await users.delete('1');
      expect(deleteuser?.firstname).toBe('Mohamed');
      expect(deleteuser?.lastname).toBe('Amr');
      expect(deleteuser?.username).toBe('mohamedamr241');
    });
  });
});
