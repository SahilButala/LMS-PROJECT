import { Skeleton } from "@/components/ui/skeleton";
import { HomeViewContext } from "@/Context/Home-View/HomeViewContext";
import {
  CreatePayemtCourseService,
  fetchHomeStudentCourseDetailsService,
  getPurchaseStudentCourseInfo,
} from "@/services/api-services";
import React, { useContext, useEffect, useState } from "react";
import { json, Link, useNavigate, useParams } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { GiNetworkBars } from "react-icons/gi";
import { CiGlobe } from "react-icons/ci";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IoIosPlay } from "react-icons/io";
import { GoLock } from "react-icons/go";
import VideoPlayer from "@/components/Video_Player/VideoPlayer";
import { Item } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginRegister } from "@/Context/auth/Register";

const CourseDetailsPage = () => {
  const { auth } = useContext(LoginRegister);

  const {
    studentCourseDetailsPage,
    setstudentCourseDetailsPage,
    cureentCourseDetailId,
    setcureentCourseDetailId,
    isloading,
    setisloading,
  } = useContext(HomeViewContext);
  const [displayCurrentFreePreviewVideo, setdisplayCurrentFreePreviewVideo] =
    useState(null);
  const [showPreviewDialog, setshowPreviewDialog] = useState(false);
  const [getCureentLecID, setgetCureentLecID] = useState("");
  const params = useParams();
  const [approvalUrl, setapprovalUrl] = useState("");
  const navigate = useNavigate()

  async function fetchCourseDetailsInfoById() {
    const res = await fetchHomeStudentCourseDetailsService(
      cureentCourseDetailId
    );

    const checkPurchaseCourseInfo = await getPurchaseStudentCourseInfo(cureentCourseDetailId, auth?.user?._id)

// if(checkPurchaseCourseInfo.success && checkPurchaseCourseInfo){
//     navigate(`/course-progress/${cureentCourseDetailId}`)
// }
  

    if (res.success) {
      setstudentCourseDetailsPage(res.data);
      setisloading(false);
    } else {
      setstudentCourseDetailsPage(null);
      setisloading(true);
    }
  }

  useEffect(() => {
    if (displayCurrentFreePreviewVideo !== null) {
      setshowPreviewDialog(true);
    }
  }, [displayCurrentFreePreviewVideo]);

  useEffect(() => {
    if (cureentCourseDetailId !== null) fetchCourseDetailsInfoById();
  }, [cureentCourseDetailId]);


  useEffect(() => {
    if (params.id) setcureentCourseDetailId(params.id);
  }, [params.id]);

  if (isloading) return <Skeleton />;

  const getIndexOfFreePreview =
    studentCourseDetailsPage !== null
      ? studentCourseDetailsPage.curriculum?.findIndex(
          (Item) => Item.freePreview
        )
      : -1;

  function handleFreePreviewDialog(getCurrentVideoID, getCureentLecID) {
    setdisplayCurrentFreePreviewVideo(getCurrentVideoID.videoUrl);
    setgetCureentLecID(getCureentLecID);
  }

  // to proceed payment getway
  async function handleCreatePayment() {
    const payemtplayload = {
      userId: auth.user._id,
      userName: auth?.user?.userName,
      userEmail: auth.user.userEmail,
      orderStauts: "pending",
      paymentMethod: "paypal",
      paymentStatus: "initiated",
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId: studentCourseDetailsPage?.instructorId,
      instructorName: studentCourseDetailsPage?.instructorName,
      courseImage: studentCourseDetailsPage?.image,
      courseTitle: studentCourseDetailsPage?.title,
      courseId: studentCourseDetailsPage._id,
      coursePricing: studentCourseDetailsPage.pricing,
    };

    console.log("-----", payemtplayload);

    const res = await CreatePayemtCourseService(payemtplayload);
    if (res.success) {
      sessionStorage.setItem(
        "currentOrderId",
        JSON.stringify(res.data.orderId)
      );
      setapprovalUrl(res.data.approveUrl);
    }
    console.log(res.data)
  }

  if (approvalUrl !== "") {
    window.location.href = approvalUrl;
  }

  return (
    <div>
      <div className="courseDetailPage">
        {/* upper side */}
        <div className="upperSide min-h-[190px] bg-black w-full text-white px-16 rounded-xl ">
          <div className="pt-8">
            <div className="title text-[36px] font-bold">
              {studentCourseDetailsPage.title}
            </div>
            <div className="div">
              <div className="sections flex gap-6 mt-5">
                <div className="date flex items-center gap-2">
                  {" "}
                  <CiClock2 className="text-[#FF782D]" />
                  Created Date : {studentCourseDetailsPage.date.slice(0, 10)}
                </div>
                <div className="students flex items-center gap-2 ">
                  <FaGraduationCap className="text-[#FF782D]" />
                  {studentCourseDetailsPage.students.length <= 1
                    ? "Student"
                    : "Students"}{" "}
                  : {studentCourseDetailsPage.students.length}
                </div>
                <div className="level flex gap-2 items-center capitalize">
                  <GiNetworkBars className="text-[#FF782D]" />
                  Level : {studentCourseDetailsPage.level}
                </div>
                <div className="level flex gap-2 items-center capitalize">
                  <CiGlobe className="" />
                  Language : {studentCourseDetailsPage.primaryLanguage}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="discription mt-3 ">
          <Card className="p-2">
            <CardHeader className="text-xl font-medium">Description</CardHeader>
            <CardContent className="text-[17px] capitalize text-gray-600">
              {studentCourseDetailsPage.description}
            </CardContent>
          </Card>
        </div>
        {/* lower side */}
        <div className="flex flex-col md:flex-row gap-7 ">
          <main className="lower-section mt-5 flex-grow ">
            <div>
              <Card className="p-3">
                <CardHeader className="font-medium capitalize text-xl">
                  What you will learn in this Course..!
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2  gap-2">
                    {studentCourseDetailsPage?.objectives
                      .split(",")
                      .map((objective, index) => (
                        <div className="" key={index}>
                          <li className="list-disc capitalize">{objective}</li>
                        </div>
                      ))}
                  </ul>
                </CardContent>
              </Card>

              {/* video sections */}

              <Card className="mt-8">
                <CardHeader className="font-medium text-xl">
                  Course Curriculum or Topics & Video
                </CardHeader>
                <CardContent>
                  {studentCourseDetailsPage.curriculum.map((topic, index) => (
                    <li 
                      key={index}
                      onClick={
                        topic?.freePreview
                          ? () => handleFreePreviewDialog(topic)
                          : null
                      }
                      className={`${
                        topic?.freePreview
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      } flex gap-2 items-center"`}
                    >
                      <div className="flex items-center font-medium">
                        {topic.freePreview ? (
                          <IoIosPlay />
                        ) : (
                          <GoLock className="" />
                        )}
                      </div>
                      <span className="capitalize">{topic.title}</span>
                    </li>
                  ))}
                </CardContent>
              </Card>
            </div>
          </main>
          <aside className="w-full md:w-[500px] mt-5">
            <Card className="sticky top-3">
              <CardHeader className="text-xl font-semibold">
                Lectures Videos
              </CardHeader>
              <CardContent>
                <div className="aspect-video mb-7 rounded-lg flex items-center justify-center flex-col">
                  <p className="mb-2 font-medium">
                    {studentCourseDetailsPage.title}
                  </p>
                  <VideoPlayer
                    url={
                      getIndexOfFreePreview !== null
                        ? studentCourseDetailsPage?.curriculum[
                            getIndexOfFreePreview
                          ].videoUrl
                        : ""
                    }
                    width="440px"
                    height="250px"
                  />
                  <b className="mt-3">
                    {
                      studentCourseDetailsPage.curriculum[getIndexOfFreePreview]
                        .title
                    }
                  </b>
                </div>
                <b className="text-xl">
                  Courese <span className="text-orange-500">Price</span> :{" "}
                  {studentCourseDetailsPage.pricing}$
                </b>
                <Button onClick={handleCreatePayment} className="w-full mt-3">
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
        {/* dialog page */}
        <div>
          <Dialog
            open={showPreviewDialog}
            onOpenChange={() => {
              setshowPreviewDialog(false);
              setdisplayCurrentFreePreviewVideo(null);
            }}
          >
            <DialogContent className="min-w-[600px]">
              <DialogHeader>
                <DialogTitle className="font-medium uppercase">
                  Course Video
                </DialogTitle>
                {/* <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription> */}
              </DialogHeader>
              <div className="">
                <VideoPlayer
                  url={displayCurrentFreePreviewVideo}
                  width="100%"
                  height="280px"
                />
              </div>
              <div className="flex flex-col gap-2">
                {studentCourseDetailsPage?.curriculum
                  ?.filter((item) => item.freePreview)
                  .map((filteredItem, index) => (
                    <div key={index} className="cursor-pointer">
                      <li
                        onClick={() =>
                          handleFreePreviewDialog(filteredItem, index)
                        }
                        className={`${
                          getCureentLecID === index ? "underline" : "list-none"
                        }"cursor-pointer text-[16px] font-medium"`}
                      >
                        {filteredItem?.title}
                      </li>
                    </div>
                  ))}
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
