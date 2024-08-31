const { app, server, isServerReady } = require('../src/app'); 
const { appUser, authentication, sequelize } = require('../src/models');

jest.mock('../src/util/emailUtil', () => ({
  sendPasswordResetEmail: jest.fn().mockResolvedValue({ success: true }), // Or adjust as necessary
  sendVerificationCodeEmail: jest.fn().mockResolvedValue({ success: true }) // Or adjust as necessary
}));

// May not required because setup is doing the same
beforeAll(async () => {
  try{
    
  // Polling mechanism to wait for the server to be ready
  const maxRetries = 30; // Maximum number of retries
  const retryInterval = 1000; // Interval in milliseconds

  for (let i = 0; i < maxRetries; i++) {
    if (isServerReady()) {
      break;
    }
    console.log('setup: Waiting for server to be ready...');
    await new Promise(resolve => setTimeout(resolve, retryInterval));
  }

  if (!isServerReady()) {
    throw new Error('setup: Server did not start within the expected time');
  }

  console.log('setup: Server is ready, starting tests');

  }catch(error){
    console.warn(" setup: error while destroying", error);
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
      await sequelize.drop()
      await sequelize.close();  // Close Sequelize connection
    }
    await new Promise(resolve => setTimeout(() => resolve(), 1000)); // Wait for async operations to complete

  });