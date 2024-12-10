import  {getallStudentCourses,getallStudentCoursesDetails,checkCoursePurchase} from '../../controllers/HomeCourse.js'
import express from 'express'


const HomeCourse_Route = express.Router()

// all routes
HomeCourse_Route.get('/courses',getallStudentCourses)
HomeCourse_Route.get('/courses/details/:id',getallStudentCoursesDetails)
HomeCourse_Route.get('/purchase-info/details/:id/:studentId',checkCoursePurchase)

export default HomeCourse_Route