const request = require('supertest');
// const app = require('../src/app');
const bcrypt = require('bcryptjs');
const { app, server, isServerReady } = require('../src/app');
const { appUser, authentication, sequelize } = require('../src/models');
const { hashPassword, comparePassword } = require('../src/util/passwordUtil');

const parentType = 1;
const lasType = 3;

const parentRole = 1;
const lasRole = 2;

const disallowedRole = 4;
const disallowedUserType = 5;


describe('POST /api/auth/register', () => {
  it('should register a new parent', async () => {
    const userData = {
      firstName: 'Parent',
      lastName: 'ln',
      role: parentRole,
      phoneNumber: '1234567890',
      email: 'parent@gmail.com',
      password: 'password123',
      userType: parentType
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully');

    // Check if user and authentication records are created
    const user = await appUser.findOne({ where: { email: userData.email } });
    const auth = await authentication.findOne({ where: { auth_user_id: user.id } });

    expect(user).toBeDefined();
    expect(auth).toBeDefined();
    expect(auth.username).toBe(userData.username);
    expect(user.userType).toBe(parentType);
    expect(user.role).toBe(parentRole);

    // Check if password is hashed
    const isPasswordMatch = await comparePassword(userData.password, userData.email, auth.password);
    expect(isPasswordMatch).toBeTruthy();
  });

  it('should return error for existing email', async () => {
    const existingUserData = {
      firstName: 'Jane',
      lastName: 'Doe',
      role: parentRole,
      phoneNumber: '1234567890',
      email: 'johndoe@gmail.com',
      password: 'password123',
      userType: parentType
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

  it('should register a new lsa', async () => {
    const userData = {
      firstName: 'lsa',
      lastName: 'lastname',
      role: lasRole,
      phoneNumber: '1234567890',
      email: 'lsa@gmail.com',
      password: 'password123',
      userType: lasType
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully');

    // Check if user and authentication records are created
    const user = await appUser.findOne({ where: { email: userData.email } });
    const auth = await authentication.findOne({ where: { auth_user_id: user.id } });

    expect(user).toBeDefined();
    expect(auth).toBeDefined();
    expect(auth.username).toBe(userData.username);
    expect(user.userType).toBe(lasType);
    expect(user.role).toBe(lasRole);

    // Check if password is hashed
    const isPasswordMatch = await comparePassword(userData.password, userData.email, auth.password);
    expect(isPasswordMatch).toBeTruthy();
  });


  it('should return error for incorrect combination of role and userType', async () => {
    const userData = {
      firstName: 'error',
      lastName: 'combination',
      role: lasRole,
      phoneNumber: '1234567890',
      email: 'uniq@gmail.com',
      password: 'password123',
      userType: parentType
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Invalid request 005');

  });

  it('should return error disallowed role and userType', async () => {
    const userData = {
      firstName: 'error',
      lastName: 'combination',
      role: disallowedRole,
      phoneNumber: '1234567890',
      email: 'uniq@gmail.com',
      password: 'password123',
      userType: disallowedUserType
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Invalid request 002');

  });



});