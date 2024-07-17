const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../Utils/errorHandler");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("You must be logged in", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();


});


exports.authorizeRoles = (...roles)=>{
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(
                    ` ${req.user.role} is not allowed to access this resouce `, 403
                )
            );
        }

        next();
    };
};
