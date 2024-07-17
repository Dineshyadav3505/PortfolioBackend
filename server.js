const app = require('./app');
const donenv = require('dotenv');


const connectDatabase = require('./Database/database');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught Exception`);
  process.exit(1);
});




// configuration
donenv.config({path:".env"})
const PORT = process.env.PORT ;

// Connect to Database
connectDatabase();
const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });


// unHandle Promise Rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise rejection`);
  server.close(() => {
    process.exit(1);
  });

});
