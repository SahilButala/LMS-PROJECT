import express from "express";
import {
  addNewCourse,
  GetCourseDetailsById,
  GetallCourses,
  UpdateCourseDetailsById,
} from "../../controllers/Create_Course.js";


const CourseRouter = express.Router();

// routes
CourseRouter.post("/add", addNewCourse);
CourseRouter.get("/getCourses", GetallCourses);
CourseRouter.get("/getCourse/details/:id", GetCourseDetailsById);
CourseRouter.put("/update/:id", UpdateCourseDetailsById);

export default CourseRouter;
