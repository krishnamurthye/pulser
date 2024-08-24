const request = require('supertest');
// const app = require('../src/app');
const { app, server, isServerReady } = require('../src/app');   
const { hashPassword, comparePassword } = require('../src/util/passwordUtil');

const parentType="parent";
const lasType="lsa";

const parentRole=1;
const lasRole=2;

  describe('POST /api/auth/login', () => {
    const email = 'test@example.com'
    const password = '1234567890'
    beforeAll(async () => {
      const hash = await hashPassword(password, email);
      
      const userData = {
        firstName: 'test',
        lastName: 'test',
        role: parentRole,
        phoneNumber: 987654234,
        email: email,
        password: hash,
        userType:parentType
      };
  
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);
  
      expect(response.statusCode).toBe(201);
    });

    it('should login a user and return a token', async () => {
      // Hash the password
    const hashPwd = await hashPassword(password, email);
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: email,
          password: hashPwd
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 404 if the user is not found', async () => {
      const hashPwd = await hashPassword('password123', 'test@example.com');
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: hashPwd
        });

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('User not found');
    });

    it('should return 401 if the password is incorrect', async () => {
      const hashPwd1 = await hashPassword('incorrectPassword', 'test@example.com');
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: hashPwd1
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });

  });