const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const errorHandler = require("./Middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(cors());



// Route Imports 
const front = require("./Routes/frontRoutes");
const back = require("./Routes/backRoutes");
const python = require("./Routes/pythonRoutes");
const analysis = require("./Routes/analysisRoutes");
const user = require("./Routes/userRoutes");

app.use("/api/vi", front);
app.use("/api/vi", back);
app.use("/api/vi", python);
app.use("/api/vi", analysis);
app.use("/api/vi", user);

//Middleware for error handling
app.use(errorHandler);


module.exports = app