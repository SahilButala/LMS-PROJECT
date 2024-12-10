import { Button } from "@/components/ui/button";
import { LoginRegister } from "@/Context/auth/Register";
import { HomeViewContext } from "@/Context/Home-View/HomeViewContext";
import { studentPurchaseCoursesService } from "@/services/api-services";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentCoursePage = () => {
  const { auth } = useContext(LoginRegister);
  const { studentPurchaseCourses, setstudentPurchaseCourses } =
    useContext(HomeViewContext);
  async function fetchPurchaseCourses() {
    const res = await studentPurchaseCoursesService(auth.user._id);

    if (res.success) {
      setstudentPurchaseCourses(res?.data?.courses);
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (studentPurchaseCourses !== null) {
      fetchPurchaseCourses();
    }
  }, []);
  // this page after student buy the course
  console.log("sasa", studentPurchaseCourses);
  return (
    <div>
      <div className="my-courses mt-3">
        <h1 className="text-xl font-semibold">My Courses</h1>

        <div className="lower-sec grid grid-cols-4 gap-3 mt-8">
          {studentPurchaseCourses && studentPurchaseCourses.length > 0 ? (
            studentPurchaseCourses.map((course, index) => (
              <div
                key={index}
                className="box pb-5  p-2 border shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]  hover:translate-y-[-15px] transition-all cursor-pointer grid grid-rows-subgrid row-span-4"
              >
                <div className="image w-full h-[250] relative">
                  <img
                    className="object-cover h-full "
                    src={course.courseImage}
                    alt=""
                  />
                </div>
                <div className="details">
                  <p className="titile pb-3 mt-3 text-xl font-medium">
                    {course.title}
                  </p>

                  <p className="capitalize mt-2 font-medium">
                    Created By : {course.instructorName}
                  </p>
                </div>

                <Button
                  onClick={() =>
                    navigate(`/course-progress/${course.courseId}`)
                  }
                >
                  Start Watching
                </Button>
              </div>
            ))
          ) : (
            <div className="">
              <h1 className=" font-bold">No Courses</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCoursePage;
