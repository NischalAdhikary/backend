import Router from "express";
import {
  handleLogin,
  handleSingup,
  handleVerify,
  handlelogout,
} from "../controllers/user.js";
import { authentication } from "../middlewears/authentication.js";
const router = Router();
router.post("/signup", handleSingup);
router.post("/login", handleLogin);
router.get("/logout", handlelogout);
router.get("/verify", authentication, handleVerify);
export default router;
