const ErrorHandler = require("../Utils/errorHandler");

module.exports = (err, req, res, next) => {
    console.log(err.message);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    // worng mongodb Id error 
    if(err.name == "castError"){
      const message = "${object.key(err.keyValue)} is already exist ";
      err= new  ErrorHandler(message, 400);
    }

    // 
    if(err.code === 11000){
      const message = "Resource not found. Invalid : ${ err.path}";
      err= new  ErrorHandler(message, 400);
    }



    res.status(err.statusCode).json({
      message: err.message,
    });
  };