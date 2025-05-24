import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.js";
import taskRouter from "./src/routes/task.js";

dotenv.config();
const app = express();

const allowedorigin = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:4173",
  "https://frontend-mauve-eight-65.vercel.app",
];
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedorigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use(function (req, res, next) {
  next({
    message: "Not found",
    status: 404,
  });
});
app.use(function (error, req, res, next) {
  res.status(error.status || 404).json({
    message: error.message,
    success: error.success || false,
    status: error.status || 404,
  });
});
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB", MONGODB_URI);

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
