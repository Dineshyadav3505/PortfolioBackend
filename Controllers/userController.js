const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const User = require("../Models/userModel"); // Renamed the import
const sendToken = require("../Utils/jwtToken");
const jwt = require("jsonwebtoken");
const sendEmil = require("../Utils/SendEmail");
const crypto = require("crypto");

//register a user
exports.registeruser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201,res);

  
});



/// LogIn
exports.logIn = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatch = user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email &or password", 401));
  }

  sendToken(user, 200, res);
});




/// LogOut
exports.logOutUser = catchAsyncErrors(async (req, res, next) => {
  // Set the new token as the cookie value
  res.cookie('token', null, {
    expires: new Date(Date.now() ), 
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Successfully logged out",
  });

});



/// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("Invalid email", 404));
  }

  // Get generateResetPasswordToken
  const resetToken =  user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/vi/password/reset/${resetToken}`

  const message = `your password reset token is :- \n\n${resetPasswordUrl} \n\n If you have not request this email then please ignor it`


  try{

    await sendEmil({
      email:user.email,
      subject: "Password Reset Token",
      message,

    })

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });

  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }


});



/// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res , next)=>{

  // creating tokken hash
  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Password reset token is invalid or has expired", 400));
  }

  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  sendToken(user, 200, res);

});