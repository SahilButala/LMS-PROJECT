import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Auth/LoginPage";
import { LoginRegister } from "./Context/auth/Register";
import RouteGuard from "./components/auth-protection/RouteGuard";
import Commonlayout from "./components/home-view/Common_layout";
import Home from "./pages/home/Home";
import DashBoard from "./pages/admin/MainDashBoard";
import NotFound from "./pages/Not-found/NotFound";
import AddNewCourse from "./pages/admin/add-newCoursePage/addNewCourse";
import HomeStudentCoursesPage from "./pages/home/ExploreCourses";
import CourseDetailsPage from "./pages/home/CourseDetailsPage";
import Payment_ReturnPage from "./pages/home/Payment_Return";
import StudentCoursePage from "./pages/home/my-courses/StudentCoursePage";
import CourseProgressPage from "./pages/home/CourseProgressPage";

function App() {
  // const [user, setuser] = useState('')

  const { auth } = useContext(LoginRegister);
  console.log(auth)


  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={
            <RouteGuard
              element={<LoginPage />}
              authinticated={auth?.authinticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <RouteGuard
              element={<DashBoard />}
              authinticated={auth?.authinticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="/admin/create-course"
          element={
            <RouteGuard
              element={<AddNewCourse />}
              authinticated={auth?.authinticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="/admin/edit-course/:courseId"
          element={
            <RouteGuard
              element={<AddNewCourse />}
              authinticated={auth?.authinticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="/"
          element={
            <RouteGuard
              element={<Commonlayout />}
              authinticated={auth?.authinticate}
              user={auth?.user}
            />
          }
        >
          <Route path="" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<HomeStudentCoursesPage />} />
          <Route path="/payment-return" element={<Payment_ReturnPage />} />
          <Route path="/StudentCoursePage" element={<StudentCoursePage />} />
   
          <Route path="/course-details/:id" element={<CourseDetailsPage />} />
          <Route path="/course-progress/:id" element={<CourseProgressPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
