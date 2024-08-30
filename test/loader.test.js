// test/loader.test.js

const request = require('supertest');
const { app, server } = require('../src/app');
const { appUser } = require('../src/models');
const { generateToken } = require('../src/middleware/tokenGenerator');

console.log("****************************** generateToken ******************************* ")
console.log(generateToken)

describe('School List', () => {
  let token;
  
  beforeAll(async () => {
    const user = await appUser.create({
      id: 1,
      email: 'test@example.com',
      password: 'password123',
    });
    token = await generateToken(user);
   
  });

  afterAll(async () => {
    // await appUser.destroy({ where: { email: 'test@example.com' } });
    await server.close();
  });

  test('should return schoolsList', async () => {
    
    const response = await request(app)
      .get('/api/values/list/schoolsList')
      .set('Authorization', `Bearer ${token}`)
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      console.log("response.body", response.body);
      expect(response.body.length).toBeGreaterThan(0);
  });

  test('should return schoolSystemsList', async () => {
    
    const response = await request(app)
      .get('/api/values/list/schoolSystemsList')
      .set('Authorization', `Bearer ${token}`)
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      console.log("response.body", response.body);
      expect(response.body.length).toBeGreaterThan(0);
  });

  test('should return needLevelList', async () => {
    
    const response = await request(app)
      .get('/api/values/list/needLevelList')
      .set('Authorization', `Bearer ${token}`)
      
      console.log("needLevelList response.body", response.body);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
  });


  test('should return gradesList', async () => {
    
    const response = await request(app)
      .get('/api/values/list/gradesList')
      .set('Authorization', `Bearer ${token}`)
      
      console.log("gradesList response.body", response.body);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
  });

 });
