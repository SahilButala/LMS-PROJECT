import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/Video_Player/VideoPlayer";
import { LoginRegister } from "@/Context/auth/Register";
import { HomeViewContext } from "@/Context/Home-View/HomeViewContext";
import {
  MarkedCurrentLectureViewedService,
  resetStudentCourseService,
  studentCourseProgressService,
} from "@/services/api-services";

import { Check, ChevronLeft, ChevronRight, Play } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";

// this page after student purchase the course and whenever student again click that course then this page will be triger insted of courseDetailpage
const CourseProgressPage = () => {
  const [sideBarOpen, setsideBarOpen] = useState(false);
  const { studentCurrentCourseProgres, setstudentCurrentCourseProgres } =
    useContext(HomeViewContext);
  const [lockCourse, setlockCourse] = useState(false);
  const { auth } = useContext(LoginRegister);
  const [currentLecture, setcurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setshowCourseCompleteDialog] =
    useState(false);
  const [showCourseCompletedMesg, setshowCourseCompletedMesg] = useState(false);

  const { id } = useParams();
  async function fetchCurrentCourseProgress() {
    const response = await studentCourseProgressService(auth?.user?._id, id);
    if (response?.success) {
  
      if (!response?.data?.isPurchase) {
        setlockCourse(true);
      } else {
        setstudentCurrentCourseProgres({
          courseDetail: response?.data?.courseDetail,
          progress: response?.data?.progress,
        });

        if (response?.data?.completed) {
          setcurrentLecture(response?.data?.courseDetail?.curriculum[0]);
          setshowCourseCompletedMesg(true);
          setshowCourseCompletedMesg(true);
          setshowCourseCompleteDialog(true)

          return;
        }

        if (response?.data?.progress?.length === 0) {
          setcurrentLecture(response?.data?.courseDetail?.curriculum[0]);
        } else {
          const lastIndexOfViewedAsTrue = response?.data?.progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          setcurrentLecture(
            response?.data?.courseDetail?.curriculum[
              lastIndexOfViewedAsTrue + 1
            ]
          );
        }
      }
    }
  }

  async function updateCourseProgress() {
    if (currentLecture) {
      const res = await MarkedCurrentLectureViewedService(
        auth?.user?._id,
        studentCurrentCourseProgres?.courseDetail?._id,
        currentLecture?._id
      );
      if (res?.success) {
        fetchCurrentCourseProgress();
      }
    }
  }

  useEffect(() => {
    if (currentLecture?.progressValue === 1) updateCourseProgress();
  }, [currentLecture]);

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);

  useEffect(() => {
    if (showCourseCompletedMesg)
      setTimeout(() => setshowCourseCompletedMesg(false), 5000);
  }, [showCourseCompletedMesg]);

  // console.log("sa",currentLecture?._id)

  async function handleRewatchCourse(){
           const res = await resetStudentCourseService(auth?.user?._id, studentCurrentCourseProgres?.courseDetail?._id)

           if(res?.success){
            setcurrentLecture(null)
            setshowCourseCompletedMesg(false)
            setshowCourseCompleteDialog(false)
            fetchCurrentCourseProgress()
           }
  }

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col min-h-full w-full  border border-b-lime-400 ">
        {showCourseCompletedMesg && <Confetti />}
        <div className="space-x-4 border-b-2 border p-2 flex justify-between items-center">
          <div className="upper-sec flex items-center   ">
            <Button onClick={() => navigate(`/StudentCoursePage`)}>
              <ChevronLeft />
              Back To My Courses
            </Button>
            <h1 className="ml-4 font-bold  text-xl">
              {studentCurrentCourseProgres?.courseDetail?.title}
            </h1>
          </div>

          <Button className="mt-2" onClick={() => setsideBarOpen(!sideBarOpen)}>
            {sideBarOpen ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>

        <div className="flex flex-1 overflow-hidden mt-2">
          <div
            className={`flex-1 ${
              sideBarOpen ? "mr-[35opx]" : ""
            } transition-all duration-300 `}
          >
            <VideoPlayer
              url={currentLecture?.videoUrl}
              width="100%"
              height="500px"
              progressData={currentLecture}
              onProgressUpdate={setcurrentLecture}
            />

            <div>
              <h2 className="mt-3 text-2xl font-semibold px-3">
                Lecture : {currentLecture?.title}
              </h2>
            </div>
          </div>
          <div
            className={`fixed top-[65px] bg-black rounded-xl   text-white right-0 bottom-0 w-[350px] transition-all ${
              sideBarOpen ? "translate-x-0" : "translate-x-full"
            } p-4 capitalize font-semibold`}
          >
            <Tabs defaultValue="content" className="h-full flex p-0 flex-col">
              <TabsList className="gird w-ful p-0 grid-cols-2 h-14 ">
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-white rounded-none h-full capitalize font-bold text-black "
                >
                  Course Content
                </TabsTrigger>
                <TabsTrigger
                  value="OverView"
                  className="rounded-none h-full capitalize font-bold text-black"
                >
                  OverView
                </TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="mt-3">
                <h2 className="font-bold mb-3">Lectures : </h2>
                <ScrollArea className="h-full">
                  <div className="space-y-4">
                    {studentCurrentCourseProgres?.courseDetail?.curriculum?.map(
                      (item, index) => (
                        <div
                          key={item?._id}
                          className="flex items-center space-x-2  font-semibold cursor-pointer"
                        >{
                          studentCurrentCourseProgres?.progress?.find(progress=> progress.lectureId === item?._id)?.viewed ? <Check className="text-green-400 font-bold"/> : <Play/>
                        }
                          <span>{item?.title}</span>
                        </div>
                      )
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="OverView">
                <ScrollArea className="h-full">
                  <div className="p-4 ">
                    <h1 className="text-[15px] mb-1 font-bold text-[#FB923C]">
                      About this Course
                    </h1>
                    <h1 className="text-xl font-medium">
                      {studentCurrentCourseProgres?.courseDetail?.title}
                    </h1>
                    <h1>
                      Course Created By :{" "}
                      {
                        studentCurrentCourseProgres?.courseDetail
                          ?.instructorName
                      }
                    </h1>
                    <div className="font-normal mt-5">
                      <span className="font-bold">Description</span> :{" "}
                      {studentCurrentCourseProgres?.courseDetail?.description}
                    </div>
                    <p className="mt-5">
                      Language :{" "}
                      {
                        studentCurrentCourseProgres?.courseDetail
                          ?.primaryLanguage
                      }
                    </p>
                    <p className="mt-5">
                      Category :{" "}
                      {studentCurrentCourseProgres?.courseDetail?.category}
                    </p>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Dialog open={lockCourse}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>You cant't view this page</DialogTitle>
              <DialogDescription>
                Please Purchase the Course to get access
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog open={showCourseCompleteDialog}>
          <DialogContent>
            <DialogHeader className={"capitalize"}>
                       <DialogTitle>congratulation...!</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <Label className="">You have Completed the Course</Label>
              <div className="mt-3 flex gap-4">
                <Button
                onClick={()=> navigate(`/StudentCoursePage`)}
                >My Courses Page</Button>
                <Button
                 onClick={handleRewatchCourse}
                >Rewach Course</Button>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CourseProgressPage;
