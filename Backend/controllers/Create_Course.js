import courseModel from "../models/Create_Course.js";
const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newCreatedCourse = new courseModel(courseData);
    const saveCourse = newCreatedCourse.save();

    if (saveCourse) {
      res.json({
        success: true,
        message: "your course added successfully...",
        data: {
          courseDetails: saveCourse,
        },
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};
const GetallCourses = async (req, res) => {
  try {
    const GetCourse = await courseModel.find({});
    

    if (GetCourse) {
      res.json({
        success: true,
        data: GetCourse,
      });
    }

  } catch (error) {
    console.log("error", error);
    return res.json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};
const GetCourseDetailsById = async (req, res) => {
  try {
    const { id} = req.params;
    const CourseDetails = await courseModel.findById(id);
    if (!CourseDetails) {
      return res.json({
        success: false,
        message:
          "thier is no type of course exsist in this site.. ! please try again",
      });
    }

    

    res.json({
      success: true,
      data: CourseDetails,
    });
  } catch (error) {
    console.log("error", error);
    return res.json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};
const UpdateCourseDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const UpdatedData = req.body;
    const UpdatedCourse = await courseModel.findByIdAndUpdate(id, UpdatedData, {
      new: true,
    });

    if (!UpdatedCourse) {
      return res.json({
        success: false,
        message:
          "thier is no type of course exsist in this site.. ! please try again",
      });
    }

    res.json({
      success: true,
      message: "your course successfully updated",
      data: UpdatedCourse,
    });
  } catch (error) {
    console.log("error", error);
    return res.json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};

export {
  addNewCourse,
  GetCourseDetailsById,
  GetallCourses,
  UpdateCourseDetailsById,
};
