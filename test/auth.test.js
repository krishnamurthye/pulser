const request = require('supertest');
// const app = require('../src/app');
const bcrypt = require('bcryptjs');
const { app, server } = require('../src/app'); 
const { appUser, authentication, sequelize } = require('../src/models');

// May not required because setup is doing the same
beforeAll(async () => {
  try{
  // Clear users table before running tests
  await appUser.destroy({ where: {} });
  await authentication.destroy({ where: {} });
  
  }catch(error){
    console.warn(" error while destroying", error);
  }
});

afterAll(async () => {
    
    // Close the server and database connection after tests
    if (server) {
       await new Promise((resolve) => server.close(resolve));  // Properly close the server
       
    }
    if(server){
      await server.close();
    }
    if (sequelize){
      // await sequelize.drop()
      await sequelize.close();  // Close Sequelize connection
    }
    await new Promise(resolve => setTimeout(() => resolve(), 1000)); // Wait for async operations to complete

  });
  
describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      role: 1,
      phoneNumber: '1234567890',
      email: 'johndoe@gmail.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully');

    // Check if user and authentication records are created
    const user = await appUser.findOne({ where: { phoneNumber: userData.phoneNumber } });
    const auth = await authentication.findOne({ where: { auth_user_id: user.id } });

    expect(user).toBeDefined();
    expect(auth).toBeDefined();
    expect(auth.username).toBe(userData.username);

    // Check if password is hashed
    const isPasswordMatch = await bcrypt.compare(userData.password, auth.password);
    expect(isPasswordMatch).toBeTruthy();
  });

  it('should return error for existing phone number', async () => {
    const existingUserData = {
      firstName: 'Jane',
      lastName: 'Doe',
      role: 3,
      phoneNumber: '1234567890',
      email: 'johndoe@gmail.com',
      password: 'password123'
    };

    await request(app)
      .post('/api/auth/register')
      .send(existingUserData);

    const response = await request(app)
      .post('/api/auth/register')
      .send(existingUserData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'User with this email already exists');
  });
});
