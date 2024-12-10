import studentCourse from '../models/StudentCourse.js'
const getCourseByStudentId = async (req,res)=>{
        try {

            const {studentId} = req.params
            const studentCourses = await studentCourse.findOne({
                userId : studentId
            })

           return res.json({
                success : true,
                data : studentCourses
            })
            
        } catch (error) {
            console.log("error",error)
            res.json({
                success : false,
                message : error.message
            })
        }
}

export default getCourseByStudentId