import mongoose from 'mongoose'

const LectureProgressSchema = new mongoose.Schema({
     lectureId : String,
     viewed : Boolean,
     dateView : Date
})

const CourseProgress_Model = new mongoose.Schema({
      userId : String,
      courseId : String,
      completed : Boolean, 
      complitionDate : Date,
      lectureProgress : [LectureProgressSchema],

})


const CourseStudentProgress = mongoose.model.courseprogress || mongoose.model("Courseprogress",CourseProgress_Model)

export default CourseStudentProgress