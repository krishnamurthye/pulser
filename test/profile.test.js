// test/profile.test.js

const request = require('supertest');
const { app, server } = require('../src/app');
const { appUser } = require('../src/models');
const generateToken = require("../src/middleware/tokenGenerator");

describe('Authentication Middleware', () => {
  let token;
  
  beforeAll(async () => {
    const u =  await appUser.create({
      id: 1,
      email: 'test@example.com',
      password: 'password123',
    });
    token = await generateToken(u);
  });

  afterAll(async () => {
    // await appUser.destroy({ where: { email: 'test@example.com' } });
    await server.close();
  });

  test('should return 401 if no token is provided', async () => {
    const response = await request(app).put('/api/profile/update');
    expect(response.status).toBe(401);
  });

  // test('should return 200 if valid token is provided', async () => {
  //   const response = await request(app)
  //     .put('/api/profile/update')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({ streetAddress: '123 Main St', city: 'Anytown', postalAddress: '12345' });
    
  //   expect(response.status).toBe(200);
  //   expect(response.body.message).toBe('Profile updated successfully');
  // });

  it('should add a child when valid input is provided', async () => {
    const response = await request(app)
      .post('/api/parent/add/child')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Child',
        lastName: 'User1',
        dob: '2005-01-01',
        school: 'ABC School' // Assuming 'school' is a valid property for adding a child
      });

    expect(response.status).toBe(201); // Assuming you return a 201 status code upon successful creation
    expect(response.body.message).toBe('Child added successfully');
  });

  it('should return a list of children for a given userId', async () => {
    await appUser.create({
      
      firstName: 'Child',
      lastName: 'User2',
      role: 2,
      userType: 2,
      parentId: 1,
      dob: '2005-01-01',
      isActive: true
    });

    
    const response = await request(app)
      .get('/api/parent/list/child')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    console.log(response.body)
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('id', 2);
    expect(response.body[0]).toHaveProperty('firstName', 'Child');
    expect(response.body[0]).toHaveProperty('lastName', 'User1');

    expect(response.body[1]).toHaveProperty('id', 3);
    expect(response.body[1]).toHaveProperty('firstName', 'Child');
    expect(response.body[1]).toHaveProperty('lastName', 'User2');
  });

  it('should return requested children for a given childId', async () => {
    // await appUser.create({
     
    //   firstName: 'Child',
    //   lastName: 'User2',
    //   role: 2,
    //   userType: 2,
    //   parentId: 1,
    //   dob: '2005-01-01',
    //   isActive: true
    // });

    
    // const response = await request(app)
    //   .get('/api/parent/lisgett/child')
    //   .set('Authorization', `Bearer ${token}`);

    // expect(response.status).toBe(200);
    // expect(response.body).toHaveLength(2);
    // expect(response.body[0]).toHaveProperty('id', 2);
    // expect(response.body[0]).toHaveProperty('firstName', 'Child');
    // expect(response.body[0]).toHaveProperty('lastName', 'User1');

    // expect(response.body[1]).toHaveProperty('id', 3);
    // expect(response.body[1]).toHaveProperty('firstName', 'Child');
    // expect(response.body[1]).toHaveProperty('lastName', 'User2');


    const response = await request(app)
      .get('/api/parent/get/child/2')
      .set('Authorization', `Bearer ${token}`);


    expect(response.status).toBe(200);   
    expect(response.body[0]).toHaveProperty('id', 2);
    expect(response.body[0]).toHaveProperty('firstName', 'Child');
    expect(response.body[0]).toHaveProperty('lastName', 'User1');


  });
});
