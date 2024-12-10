// home page view controllers
import courseModel from "../models/Create_Course.js";
import studentCourses from "../models/StudentCourse.js";
const getallStudentCourses = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
    } = req.query;
    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.pricing = 1;
        break;
      case "price-hightolow":
        sort.pricing = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;

      default:
        sort.pricing = 1;
        break;
    }

    const coursesList = await courseModel.find(filters).sort(sort);

    res.json({
      success: true,
      data: coursesList,
    });
  } catch (error) {
    console.log("error", error);
    return res.json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};
const getallStudentCoursesDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const courseDetails = await courseModel?.findById(id);

    if (!courseDetails) {
      res.json({
        success: false,
        message: "no details of course found",
        data: [],
      });
    }
    // check  if student purchase the course or not


    res.json({
      success: true,
      data: courseDetails,
    });
  } catch (error) {
    console.log("error", error);
    return res.json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};

const checkCoursePurchase =async (req, res) => {
  try {
    const { id, studentId} = req.params;
   
    const studentCourse = await studentCourses.findOne({
      userId: studentId,
    });

    const ifStudentAlreadyPurchaseCurrentCourse =
      studentCourse?.courses?.findIndex((item) => item?.courseId === id) > -1;

      res.json({
        success: true,
        data: ifStudentAlreadyPurchaseCurrentCourse 
      });

  } catch (error) {
    console.log("error", error);
    return res.json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};

export { getallStudentCourses, getallStudentCoursesDetails , checkCoursePurchase};
