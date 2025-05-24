import User from "../models/user.js";
import { createToken } from "../libs/jwt.js";
import { hassPassword, checkPassword } from "../libs/hashpassword.js";
const handlelogout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.json({
      message: "Logout successful",
      success: true,
      status: 200,
    });
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
      success: false,
    });
  }
};
const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next({
        message: "Please provide email and password",
        status: 400,
        success: false,
      });
    }
    console.log(email, password);

    const user = await User.findOne({ email });
    if (!user) {
      return next({
        message: "User not found",
        status: 404,
        success: false,
      });
    }
    const isValid = await checkPassword(password, user.password);
    if (!isValid) {
      return next({
        message: "Invalid password",
        status: 401,
        success: false,
      });
    }
    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.json({
      message: "Login successful",
      success: true,
      status: 200,
      user,
    });
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
      success: false,
    });
  }
};
const handleSingup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next({
        message: "Please provide name, email and password",
        status: 400,
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return next({
        message: "User already exists",
        status: 409,
        success: false,
      });
    }
    const hashedPassword = await hassPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json({
      message: "Signup successful",
      success: true,
      status: 201,
      user: newUser,
    });
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
      success: false,
    });
  }
};
const handleVerify = async (req, res, next) => {
  if (!req.user) {
    return next({
      message: "User not found",
      status: 404,
      success: false,
    });
  }
  return res.json({
    message: "User verified",
    success: true,
    status: 200,
    user: req.user,
  });
};

export { handleLogin, handleSingup, handleVerify, handlelogout };
