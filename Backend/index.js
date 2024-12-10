import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { ConnectDb } from "./db/Db_connection.js";

import admin_Route from "./routes/admin/admin_Route.js";
import userRoute from "./routes/User/User_Route.js";
import CourseRouter from "./routes/admin/Course_Route.js";
import cookieParser from "cookie-parser";
import Order_Route from "./routes/Home-routes/OrderRoute.js";
import HomeCourse_Route from "./routes/Home-routes/HomeRouteCourse.js";
import Student_Course_Route from "./routes/Home-routes/Student_Course.js";
import CourseProgress_Route from "./routes/Home-routes/Course_Progress.js";

// All Variables
const PORTS = process.env.PORT || 5000;
const app = express();
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

// Cors Configuration
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middlewares
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
// Db connection
ConnectDb();

// Routes
app.use('/api/v1/user',userRoute)
app.use('/api/v1/media',admin_Route)
app.use('/api/v1/admin/course',CourseRouter)
app.use('/api/v1/home/student',HomeCourse_Route)
app.use('/api/v1/home/student/order',Order_Route)
app.use('/api/v1/home/student/mycourse', Student_Course_Route)
app.use('/api/v1/home/course-progress', CourseProgress_Route)


// Port
app.listen(PORTS, (req, res) => {
  console.log(`"server is ready to create apii" ${PORTS}`);
});


// For testing purpose
app.get("/", (req, res) => {
  res.send(`server is ready}`);
});

// setting up cookie
const isProduction = process.env.NODE_ENV === "production";

// app.get("/set-cookie", (req, res) => {
//   res.cookie("yourCookieName", "yourCookieValue", {
//     httpOnly: true,
//     secure: isProduction, // Use secure cookies in production
//     sameSite: isProduction ? "none" : "lax", // Adjust `sameSite` depending on the environment
//     maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
//   });
//   res.send("Cookie has been set!");
// });



// Global error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  return res.status(500).json({
    success: false,
    message: "somting went wrong..! ",
  });
});
