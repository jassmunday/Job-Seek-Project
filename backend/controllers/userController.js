
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import {sendToken} from "../utils/jwtToken.js"

// ^ User Registration
export const register = catchAsyncErrors(async (req, res, next) => {

  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role
  });
  sendToken(user,200,res,"User Registered Successfully!");
});

// * User Login Form
export const login = catchAsyncErrors(async(req,res,next ) => {

    const { email , password, role } = req.body;

    if(!email || !password || !role){
        return next(new ErrorHandler("Please Provide the Details",400));
    }
    const user = await User.findOne({ email }).select("+password");

    if(!user){
     return next( new ErrorHandler("Invalid Email or Password",400));
    }
    const isPswrdMatches = await user.comparePassword(password);

    if(!isPswrdMatches){
      return next(new ErrorHandler("Invalid Email or Password",400));
    }
    
    if(user.role !== role){
      return next(new ErrorHandler(`Invalid Role: ${role} Entered.`,400));
    }
    sendToken(user,200,res,"Login Successfully")
});

// & User LogOut Form
export const logout = catchAsyncErrors( async (req,res,next) => {

   res.status(201).cookie("token","",{
    expires: new Date( Date.now() ),
    httpOnly: true, 
   }).json({
    success:true,
    message:"User Logged Out Successfully!"
   })

});

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});
