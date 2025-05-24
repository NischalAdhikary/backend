import jwt from "jsonwebtoken";
const createToken = (user) => {
  const secretKey = process.env.JWT_SECRET;
  const payload = {
    id: user._id,
  };
  return jwt.sign(payload, secretKey);
};
const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};
export { createToken, verifyToken };
