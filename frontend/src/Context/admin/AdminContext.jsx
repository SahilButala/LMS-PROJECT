import { CurriculumInitialFormData, LandingInitialFormData } from "@/config";
import { createContext, useState } from "react";

export const AdminContext = createContext(null);

export const AdminContextProvider = ({ children }) => {
  const [landingPageFormData, setlandingPageFormData] = useState(
    LandingInitialFormData
  );
  const [CurriculumData, setcurriculumdata] = useState(
    CurriculumInitialFormData
  );
  
  const [mediaUploadProcess, setmediaUploadProcess] = useState(false);
  const [mediaProgressBarForUser,setmediaProgressBarForUser] = useState(0)
  const [adminCourseList,setAdminCourseList] = useState([])
  const [currentEditedCourseId,setcurrentEditedCourseId] = useState(null)

  return (
    <AdminContext.Provider
      value={{
        landingPageFormData,
        setlandingPageFormData,
        CurriculumData,
        setcurriculumdata,
        mediaUploadProcess,
        setmediaUploadProcess,
        mediaProgressBarForUser,setmediaProgressBarForUser,
        adminCourseList,setAdminCourseList,
        currentEditedCourseId,setcurrentEditedCourseId
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
