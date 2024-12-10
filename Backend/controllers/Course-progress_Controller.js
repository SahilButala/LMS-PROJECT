import courseProgress from "../models/CourseProgress.js";
import Course from "../models/Create_Course.js";
import studentCourse from "../models/StudentCourse.js";

// if student watch 1st lecture then the current lecture are treated as viewed lecture

const MarkedCurrentLectureViewed = async (req, res) => {
  try {
    const { userId, courseId, lectureId } = req.body;

    let progress = await courseProgress?.findOne({ userId, courseId });
    if (!progress) {
      progress = new courseProgress({
        userId,
        courseId,
        lectureProgress: [
          {
            lectureId,
            viewed: true,
            dateView: new Date(),
          },
        ],
      });
      await progress.save();
    } else {
      const lectureprogress = progress?.lectureProgress?.find(
        (item) => item.lectureId === lectureId
      );

      if (lectureprogress) {
        (lectureprogress.viewed = true),
          (lectureprogress.dateView = new Date());
      } else {
        progress?.lectureProgress?.push({
          lectureId,
          viewed: true,
          dateView: new Date(),
        });
      }
      await progress.save()
    }

 const course = await Course.findById(courseId)
 if(!course){
  return res.json({
    success : false,
    message : 'course not found'
  })
 } 

 // checking all lecture are viewd or not 

 const allCourseLectureView = progress.lectureProgress.length === course?.curriculum?.length && progress?.lectureProgress?.every(item=>item.viewed)

 if(allCourseLectureView){
    progress.completed = true,
    progress.complitionDate = new Date()


    await progress.save()
 }

 res.json({
  success : true,
  message : 'Lecture Marked as Viewed',
  data : progress
 })

  } catch (error) {
    console.log("error", error);
    return res.json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};

// get current course Progress details

const getCurrentCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const studentPurchaseCourse = await studentCourse.findOne({ userId });

    const isPurchaseCourseOrNot =
      studentPurchaseCourse?.courses?.findIndex(
        (item) => item.courseId === courseId
      ) > -1;

    if (!isPurchaseCourseOrNot) {
      return res.json({
        success: true,
        data: { isPurchase: false },
        message: "You need to Purchase this course..!",
      });
    }

    // checking course progress

    const currentstudentCourseprogress = await courseProgress.findOne({ userId, courseId })
      

    if (
      !currentstudentCourseprogress ||
      currentstudentCourseprogress?.lectureProgress?.length === 0
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.json({
          success: false,
          message: "course Not Found",
        });
      }
      return res.json({
        success: true,
        message: "No Progress found , you can start the course now",
        data: {
          courseDetail: course,
          progress: [],
          isPurchase: true,
        },
      });
    }

    const courseDetail = await Course.findById(courseId)

    return res.json({
      success: true,
      data: {
        courseDetail,
        progress: currentstudentCourseprogress.lectureProgress,
        completed: currentstudentCourseprogress.completed,
        complitionDate: currentstudentCourseprogress.complitionDate,
        isPurchase: true,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.json({
      success: false,
      message: error.message || "internal server error",
    });
  }
 
};

// if student want reset the course details or restart the course

const resetStudentCourse = async (req, res) => {
  try {
     const {userId,courseId} = req.body 
     const progress = await courseProgress.findOne({userId,courseId})

     if(!progress){
      return res.json({
         success : false,
         message : 'progress not found'
      })
     }
     progress.lectureProgress = [];
     progress.completed = false;
     progress.complitionDate = null;

     await progress.save()

     res.json({
      success : true,
      message : 'progress has been reset',
      data :progress
     })

  } catch (error) {
    console.log("error", error);
    return res.json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};

export {
  resetStudentCourse,
  getCurrentCourseProgress,
  MarkedCurrentLectureViewed,
};
