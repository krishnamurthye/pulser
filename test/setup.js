// // test/setup.js

// const startServer = require('../src/startServer');
// const { sequelize } = require('../src/models');

// let server;

// beforeAll(async () => {
//   server = await startServer();
// });

// afterAll(async () => {
//   if (server) {
//     server.close();
//   }
//   if (sequelize) {
//     console.log("afterAll -> cleaning the database");
//     try {
//       await sequelize.drop();  // Drop all tables
//       console.log("All tables dropped");
//     } catch (error) {
//       console.error("Error dropping tables: ", error);
//     } finally {
//       await sequelize.close();  // Close Sequelize connection
//     }

//     await new Promise(resolve => setTimeout(() => resolve(), 1000)); // Wait for async operations to complete
//   }
// });
