const nodemailer = require('nodemailer');

// Configure your email service and credentials
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE, // or another email service provider (e.g., Outlook, Yahoo, etc.)
  auth: {
    user: process.env.EMAIL_USER,  // email address to send emails from
    pass: process.env.EMAIL_PASS   // email password or an app password
  }
});

/**
 * Send an email for resetting password
 * @param {string} recipientEmail - Email of the recipient
 * @param {string} resetToken - Token for resetting the password
 */
const sendPasswordResetEmail = async (recipientEmail, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: 'Password Reset Request',
    html: `
      <h3>Password Reset</h3>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${recipientEmail}`);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email.');
  }
};

/**
 * Send an email with a verification code
 * @param {string} recipientEmail - Email of the recipient
 * @param {string} verificationCode - The verification code to be sent
 */
const sendVerificationCodeEmail = async (recipientEmail, verificationCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: 'Your Verification Code',
    html: `
      <h3>Email Verification</h3>
      <p>Your verification code is:</p>
      <h2>${verificationCode}</h2>
      <p>Please enter this code on the website to verify your email address.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification code email sent to ${recipientEmail}`);
  } catch (error) {
    console.error('Error sending verification code email:', error);
    throw new Error('Failed to send verification code email.');
  }
};


module.exports = {
  sendPasswordResetEmail,
  sendVerificationCodeEmail
};
