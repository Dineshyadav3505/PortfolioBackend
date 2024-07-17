const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    
    name:{
        type: 'string',
        required: [true,"Please enter your name"],
        maxLength:[30,"name must be at least 30 characters"],
        minLength:[4,"name must be at least 4 characters"],
    },

    email:{
        type: 'string',
        required: [true,"Please enter your email"],
        unique: true,
        validate: [validator.isEmail,'Please enter a valid email',],
    },

    password:{
        type: 'string',
        required: [true,"Please enter your password"],
        minLength:[8,"password must be at least 8 characters"],
        select: false
    },

    role:{
        type:'string',
        default: 'user',
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,

});


userSchema.pre('save', async function(next){

    if(!this.isModified("password")){
        next();
    };

    this.password = await bcrypt.genSalt(10);
    next();
});



/// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    });
  };

/// compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

/// Generating Password Reset Token 
userSchema.methods.getResetPasswordToken = function(){
    // Generate Password Reset Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    
    this.resetPasswordExpires = Date.now() + 3600000;

    return resetToken;
  };

module.exports = mongoose.model("userdata", userSchema)
