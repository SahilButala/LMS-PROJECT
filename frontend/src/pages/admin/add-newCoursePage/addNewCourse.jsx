import Curriculum from "@/components/dashboard-view/Courses/add-new-courses/Curriculum";
import LandingPage from "@/components/dashboard-view/Courses/add-new-courses/LandingPage";
import Settings from "@/components/dashboard-view/Courses/add-new-courses/Settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurriculumInitialFormData, LandingInitialFormData } from "@/config";
import { AdminContext } from "@/Context/admin/AdminContext";
import { LoginRegister } from "@/Context/auth/Register";
import {
  addNewCourseService,
  fetchAdminCourseDetailsService,
  UpdateCourseDetailsService,
} from "@/services/api-services";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddNewCourse = () => {
  const {
    landingPageFormData,
    CurriculumData,
    setcurriculumdata,
    setlandingPageFormData,
    currentEditedCourseId,
    setcurrentEditedCourseId,
  } = useContext(AdminContext);
  const { auth } = useContext(LoginRegister);
  const navigate = useNavigate();
  
  const params = useParams();
  // fetching all coursess that we created
  async function fetchCurrentCourseDetails() {
    const res = await fetchAdminCourseDetailsService(currentEditedCourseId);
    if (res?.success) {
      const setCourseFormData = Object.keys(LandingInitialFormData).reduce(
        (acc, key) => {
          acc[key] = res?.data[key] || LandingInitialFormData[key];
          
          return acc;
        },
        {}
      );
      setlandingPageFormData(setCourseFormData);
      setcurriculumdata(res?.data?.curriculum);
    }
  }
  
  // checking all fields are empty or not
  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === "" || value === null || value === undefined;
  }
  
  // validate the form data
  function validateFormData() {
    for (const key in landingPageFormData) {
      if (isEmpty(landingPageFormData[key])) {
        return false;
      }
    }
    let hasFreePreview = false;
    for (const item of CurriculumData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }
      
      if (item.freePreview) {
        hasFreePreview = true; //found at least one free preview
      }
    }
    return hasFreePreview;
  }
  // to create course
  async function handleCreateCourse() {
    const courseData = {
      instructorName : auth?.user.userName  ,
      instructorId: auth?.user._id,
      date: new Date(),
      ...landingPageFormData,
      curriculum: CurriculumData,
      isPublished: true,
    };
    const res =
    currentEditedCourseId !== null
    ? await UpdateCourseDetailsService(courseData, currentEditedCourseId)
    : await addNewCourseService(courseData);
    if (res?.success) {
      toast.success(res.message);
      setlandingPageFormData(LandingInitialFormData);
      setcurriculumdata(CurriculumInitialFormData);
      navigate("/admin");
      setcurrentEditedCourseId(null);
    }
  }

  
  useEffect(() => {
    if (currentEditedCourseId !== null) fetchCurrentCourseDetails();
  }, [currentEditedCourseId]);
  
  useEffect(() => {
    if (params?.courseId) setcurrentEditedCourseId(params?.courseId);
  }, [params?.courseId]);
  
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold dium mb-5 capitalize">
          Create a <span className="text-red-600">new</span> course{" "}
        </h1>
        <Button
          disabled={!validateFormData()}
          onClick={handleCreateCourse}
          className="tracking-wider text-sm font-bold px-5"
        >
          Submit
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="container mx-auto py-6">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList className="p-3 capitalize">
                <TabsTrigger value="curriculum" className="capitalize">
                  curriculum
                </TabsTrigger>
                <TabsTrigger value="CourseLandingPage">
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                {/* curriculum page compponet  */}
                <Curriculum />
              </TabsContent>
              <TabsContent value="CourseLandingPage">
                {/* landing page compponet  */}
                <LandingPage />
              </TabsContent>
              <TabsContent value="settings">
                {/* settings page compponet  */}
                <Settings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewCourse;
