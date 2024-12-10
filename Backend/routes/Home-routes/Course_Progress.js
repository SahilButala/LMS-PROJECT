import express from 'express'
import {resetStudentCourse,
    getCurrentCourseProgress,
    MarkedCurrentLectureViewed,} from '../../controllers/Course-progress_Controller.js'
const CourseProgress_Route = express.Router()


// all routes

CourseProgress_Route.get('/get/:userId/:courseId',getCurrentCourseProgress)
CourseProgress_Route.post('/mark-lecture-view',MarkedCurrentLectureViewed)
CourseProgress_Route.post('/reset-course',resetStudentCourse)



export default CourseProgress_Route