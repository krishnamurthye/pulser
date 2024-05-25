// // src/startServer.js

// const { sequelize } = require('./models');
// const app = require('./app');
// const { loadUserRoles, getUserRoles } = require('./loaders/loadRoles');

// const PORT = process.env.PORT || 3000;

// async function startServer() {
//   try {
//     await sequelize.sync();  // Sync all models
//     console.log('Database & tables created!');

//     await loadUserRoles();  // Seed roles after syncing the models
//     console.log('Roles have been seeded');

//     // await loadUserTypes();  // Seed user types
//     // console.log('User types have been seeded');

//     const server = await app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });

//     return server;
//   } catch (error) {
//     console.error('Unable to sync database:', error);
//     process.exit(1);  // Exit the process with a failure code
//   }
// }

// module.exports = startServer;
