// test/profile.test.js

const request = require('supertest');
const { app, server } = require('../src/app');
const { appUser } = require('../src/models');
const jwt = require('jsonwebtoken');

describe('Authentication Middleware', () => {
  let token;
  
  beforeAll(async () => {
    await appUser.create({
      id: 1,
      email: 'test@example.com',
      password: 'password123',
    });
    token = jwt.sign({ userId: 1, email: 'test@example.com' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => {
    // await appUser.destroy({ where: { email: 'test@example.com' } });
    server.close();
  });

  test('should return 401 if no token is provided', async () => {
    const response = await request(app).put('/api/profile/update');
    expect(response.status).toBe(401);
  });

  test('should return 200 if valid token is provided', async () => {
    const response = await request(app)
      .put('/api/profile/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ streetAddress: '123 Main St', city: 'Anytown', postalAddress: '12345' });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Profile updated successfully');
  });
});
