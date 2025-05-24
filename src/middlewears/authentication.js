import { verifyToken } from "../libs/jwt.js";
import User from "../models/user.js";

export const authentication = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next({
      message: "Please login to access this resource",
      status: 401,
      success: false,
    });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return next({
      message: "Invalid token",
      status: 401,
      success: false,
    });
  }
  const userid = decoded.id;
  const user = await User.findById(userid);
  if (!user) {
    return next({
      message: "User not found",
      status: 404,
      success: false,
    });
  }
  req.user = user;
  next();
};
