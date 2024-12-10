import { createContext, useState } from "react";

export const HomeViewContext = createContext(null);

export const HomeViewContextProvider = ({ children }) => {
  const [studentCourseList, setstudentCourseList] = useState([]);
  const [isloading,setisloading] = useState(true)
  const [studentCourseDetailsPage , setstudentCourseDetailsPage] = useState(null)
  const [cureentCourseDetailId,setcureentCourseDetailId] = useState(null)
  const [studentPurchaseCourses,setstudentPurchaseCourses] = useState([])
  const [studentCurrentCourseProgres,setstudentCurrentCourseProgres] = useState({})
  return (
    <HomeViewContext.Provider
      value={{ studentCourseList, setstudentCourseList , isloading,setisloading,studentCourseDetailsPage , setstudentCourseDetailsPage,cureentCourseDetailId,setcureentCourseDetailId,
        studentPurchaseCourses,setstudentPurchaseCourses,
        studentCurrentCourseProgres,setstudentCurrentCourseProgres
      }}
    >
      {children}
    </HomeViewContext.Provider>
  );
};
