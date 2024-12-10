import ProgressBar from "@/components/Progress_bar/ProgressBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/Video_Player/VideoPlayer";
import { CurriculumInitialFormData, LandingInitialFormData } from "@/config";
import { AdminContext } from "@/Context/admin/AdminContext";
import {
  BulkMediaUploadService,
  mediaDeleteProcessService,
  mediaUploadProcessService,
} from "@/services/api-services";
import { Upload } from "lucide-react";
import React, { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";


const Curriculum = () => {
  const {
    CurriculumData,
    setcurriculumdata,
    mediaUploadProcess,
    setmediaUploadProcess,
    mediaProgressBarForUser,
    setmediaProgressBarForUser,
  } = useContext(AdminContext);

  // bulk upload functionality
  const bulkUploadInputRef = useRef(null);

  // to select multiple video handler
  const handleBulkUploadFeature = () => {
    bulkUploadInputRef?.current.click();
  };
  // to upload multiple lectures handler
  const handleBulkMediaUpload = async (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    try {
      setmediaUploadProcess(true);
      const response = await BulkMediaUploadService(
        formData,
        setmediaProgressBarForUser
      );
      // console.log("respose video ----",res)
      setmediaUploadProcess(false);

      if (response?.success) {
        toast.success(response.message);
        let cpyCourseCurriculumFormdata =
          areAllCourseCurriculumFormDataObjectsEmpty(CurriculumData)
            ? []
            : [...CurriculumData];

        cpyCourseCurriculumFormdata = [
          ...cpyCourseCurriculumFormdata,
          ...response?.data.map((item, index) => ({
            videoUrl: item?.url,
            public_id: item?.public_id,
            title: `Lecture ${
              cpyCourseCurriculumFormdata.length + (index + 1)
            }`,
            freePreview: false,
          })),
        ];
        setcurriculumdata(cpyCourseCurriculumFormdata);
        setmediaUploadProcess(false);
      } else {
        toast.error(response.messsage);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const areAllCourseCurriculumFormDataObjectsEmpty = (arr) => {
    return arr.every((obj) => {
      return Object.entries(obj).every(([key, value]) => {
        // if (typeof value === "boolean") {
        //   return true;
        // }
        return value === "";
      });
    });
  };
 function handleFreePreviewChange(currentValue, currentIndex) {
    let cpyCourseCurriculumFormData = [...CurriculumData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };
    setcurriculumdata(cpyCourseCurriculumFormData)
  }

  // ------all functions--------
  const handleAddLecture = () => {
    setcurriculumdata([
      ...CurriculumData,
      {
        ...CurriculumInitialFormData[0],
      },
    ]);
  };
  // to change title value
  const handleTitileChange = (e, index) => {
    let copyCurriculumData = [...CurriculumData];
    copyCurriculumData[index] = {
      ...copyCurriculumData[index],
      title: e.target.value,
    };
    setcurriculumdata(copyCurriculumData);
  };
  //  to upload video
  const handleUploadVideo = async (e, index) => {
    const selectedfile = e.target.files[0];
    if (selectedfile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedfile);
      try {
        setmediaUploadProcess(true);
        const res = await mediaUploadProcessService(
          videoFormData,
          setmediaProgressBarForUser
        );
        if (res.success) {
          let copyCurriculumData = [...CurriculumData];
          copyCurriculumData[index] = {
            ...copyCurriculumData[index],
            videoUrl: res?.data?.url,
            public_id: res?.data?.public_id,
          };
          setcurriculumdata(copyCurriculumData);
          setmediaUploadProcess(false);
        }
      } catch (error) {
        console.log("error", error.message);
      }
    }
  };
  // validate all filed are full fill or not by user
  const isFormDataFillOrNot = () => {
    return CurriculumData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        item.title !== "" &&
        item.videoUrl !== ""
      );
    });
  };
  // handaling replace video
  const handleReplaceVideo = async (index) => {
    let copyCurriculumData = [...CurriculumData];
    const Public_id = copyCurriculumData[index].public_id;

    const deleteRes = await mediaDeleteProcessService(Public_id);

    if (deleteRes.success) {
      toast.success(deleteRes.message);
      copyCurriculumData[index] = {
        ...copyCurriculumData,
        videoUrl: "",
        public_id: "",
      };
      setcurriculumdata(copyCurriculumData);
    }
    console.log("delete", deleteRes);
  };
  // function handleToDeleteLecture
  const handleToDeleteLecture = async (getCurrnetIndex) => {
    let copyCurriculumData = [...CurriculumData];
    const getVideoPublicId = copyCurriculumData[getCurrnetIndex].public_id;

    const res = await mediaDeleteProcessService(getVideoPublicId);
    if (res?.success) {
      toast.success(res.message);
      copyCurriculumData = copyCurriculumData.filter(
        (_, index) => index !== getCurrnetIndex
      );
      setcurriculumdata(copyCurriculumData);
    }
  };

  console.log("data=--",CurriculumData)

  return (
    <div>
      <Card variant="ghost">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="capitalize text-2xl font-bold">
            Create <span className="text-red-500">Course</span> Curriculum
          </CardTitle>
          <div>
            <Input
              type="file"
              ref={bulkUploadInputRef}
              accept="video/*"
              multiple
              className={`hidden`}
              id="bulkUpload"
              onChange={(e) => handleBulkMediaUpload(e.target.files)}
            />
            <Button
              as="label"
              htmlFor="bulkUpload"
              variant="outline"
              className="cursor-pointer"
              onClick={handleBulkUploadFeature}
            >
              <Upload className="h-3 w-3 mr-2" />
              Bulk-Upload
            </Button>
          </div>
        </CardHeader>
        {mediaUploadProcess ? (
          <ProgressBar
            className={`mx-3`}
            isMediaUplaoding={mediaUploadProcess}
            progress={mediaProgressBarForUser}
          />
        ) : null}
        <CardContent>
          <Button
            disabled={!isFormDataFillOrNot() || mediaUploadProcess}
            onClick={handleAddLecture}
          >
            Add Lectures
          </Button>
          <div className="mt-4 space-y-4">
            {CurriculumData.map((item, index) => (
              <div className="border p-5 rounded-lg" key={index}>
                <div className="flex gap-5 items-center">
                  <h3 className="font-bold">Lecture {index + 1}</h3>
                  <Input
                    name={`title-${index + 1}`}
                    placeholder="enter lecture title"
                    className="max-w-96 p-3 capitalize"
                    onChange={(e) => handleTitileChange(e, index)}
                    value={CurriculumData[index]?.title || ""}
                  />
                   <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={CurriculumData[index]?.freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
                {/* video uploading feature */}
                <div className="mt-5">
                  {
                    // videoUrl
                    CurriculumData[index]?.videoUrl ? (
                      <div>
                        <VideoPlayer
                          url={CurriculumData[index]?.videoUrl}
                          width={"650px"}
                          height={"300px"}
                        />
                        <Button
                          onClick={() => handleReplaceVideo(index)}
                          className="mt-5 "
                        >
                          Replace Video
                        </Button>
                        <Button className="mt-5 ml-4"
                          onClick={()=>handleToDeleteLecture(index)}
                        >Delete Lecture</Button>  
                      </div>
                    ) : (
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleUploadVideo(e, index)}
                        className="mb-4 "
                      />
                    )
                  }
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Curriculum;
