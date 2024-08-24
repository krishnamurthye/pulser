const request = require('supertest');
// const app = require('../src/app');
const { app, server, isServerReady } = require('../src/app');   
const { hashPassword, comparePassword } = require('../src/util/passwordUtil');
// const { sendPasswordResetEmail } = require('../src/util/emailUtil');
const { appUser } = require("../src/models");
const generateToken = require("../src/middleware/tokenGenerator");

// Mocking the email utility
jest.mock('../src/util/emailUtil', () => ({
  sendPasswordResetEmail: jest.fn().mockResolvedValue({ success: true }) // Or whatever your expected mock return is
}));


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

  it('should block the user after 3 failed login attempts', async () => {
    // Attempt incorrect login 3 times
    for (let i = 0; i < 3; i++) {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: email,
          password: 'incorrectPassword'
        });
    }

    // Try to log in after user is blocked
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: email,
        password: password
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Your account is blocked due to too many failed login attempts.');
  });

  it('should allow password reset request and force password reset', async () => {
    const res = await request(app)
      .post('/api/auth/request-reset-password')
      .send({
        email: email
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Password reset link sent to email');

    // Ensure user is forced to reset their password
    const userRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: email,
        password: password
  });

    expect(userRes.statusCode).toBe(403);
    expect(userRes.body.message).toBe('Please reset your password to continue.');
  });

  it('should reset password and allow login', async () => {
    // Assume token is generated during password reset request and sent to email

    const u = await appUser.create({
      id: 1,
      email: "test@example.com",
      password: "password123",
      userType: 1,
    });
    const resetToken = await generateToken(u);    
    const hash = await hashPassword('newPassword123', u.email);
    const res = await request(app)
      .post('/api/auth/reset-password')
      .send({
        token: resetToken,
        newPassword: hash
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Password reset successfully.');

    // Log in with the new password
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: email,
        password: hash
      });

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty('token');
  });

  it('should not reset password with invalid token', async () => {
    const u = await appUser.create({
      id: 1,
      email: "test@example.com",
      password: "password123",
      userType: 1,
    });
    const hash = await hashPassword('newPassword123', u.email);
    const resetToken = await generateToken(u);   
    const res = await request(app)
      .post('/api/auth/reset-password')
      .send({
        token: resetToken,
        newPassword: hash
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid or expired reset token.');
  });
});
