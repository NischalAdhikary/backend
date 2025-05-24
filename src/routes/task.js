import { Router } from "express";

import {
  createTask,
  updateTask,
  deleteTask,
  getTask,
} from "../controllers/task.js";
import { authentication } from "../middlewears/authentication.js";
const router = Router();
router.get("/gettasks", authentication, getTask);
router.post("/create", authentication, createTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);
export default router;
