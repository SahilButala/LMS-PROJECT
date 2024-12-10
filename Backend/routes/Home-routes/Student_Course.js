import express from 'express'
import getCourseByStudentId from '../../controllers/Student_Course.js'
const Student_Course_Route = express.Router()

Student_Course_Route.get('/get/:studentId',getCourseByStudentId)

export default Student_Course_Route