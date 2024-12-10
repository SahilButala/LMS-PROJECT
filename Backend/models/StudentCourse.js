import mongoose from "mongoose";
const StudentCoursesSchema = new mongoose.Schema({
    userId : String,
    courses : [
        {
            courseId: String,
            title: String,
            instructorId: String,
            instructorName: String,
            dateOfPurchase: Date,
            courseImage: String,
        }
    ]
})

const StudentCourseSchema = mongoose.model.StudentCourses || mongoose.model("StudentCourses", StudentCoursesSchema);

export default StudentCourseSchema