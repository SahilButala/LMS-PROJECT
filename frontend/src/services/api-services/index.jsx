import axiousInstance from "@/api/axiousInsatance";

export async function registerUser(formdata) {
  const { data } = await axiousInstance.post("/api/v1/user/register", {
    ...formdata,
    role: "user",
  });
  return data;
}
export async function LoginUser(formdata) {
  const { data } = await axiousInstance.post("/api/v1/user/login", {
    ...formdata,
  });
  return data;
}
export async function CheckAuthinticated() {
  const { data } = await axiousInstance.get("/api/v1/user/check-auth");
  return data;
}
export async function mediaUploadProcessService(formdata, onProgressCallback) {
  const { data } = await axiousInstance.post("/api/v1/media/upload", formdata, {
    onUploadProgress: (progressevenet) => {
      const percentageCompleted = Math.round(
        (progressevenet.loaded * 100) / progressevenet.total
      );
      onProgressCallback(percentageCompleted);
    },
  });
  return data;
}
export async function mediaDeleteProcessService(id) {
  const { data } = await axiousInstance.delete(`/api/v1/media/delete/${id}`);

  return data;
}
export async function fetchAdminCourseListService() {
  const { data } = await axiousInstance.get(`/api/v1/admin/course/getCourses`);

  return data;
}
export async function addNewCourseService(formdata) {
  const { data } = await axiousInstance.post(`/api/v1/admin/course/add`, {
    ...formdata,
  });

  return data;
}

export async function fetchAdminCourseDetailsService(id) {
  const { data } = await axiousInstance.get(
    `/api/v1/admin/course/getCourse/details/${id}`
  );

  return data;
}
export async function UpdateCourseDetailsService(formdata, id) {
  const { data } = await axiousInstance.put(
    `/api/v1/admin/course/update/${id}`,
    {
      ...formdata,
    }
  );

  return data;
}

export async function BulkMediaUploadService(formdata, onProgressCallback) {
  const { data } = await axiousInstance.post(
    "/api/v1/media/bulkUpload",
    formdata,
    {
      onUploadProgress: (progressevenet) => {
        const percentageCompleted = Math.round(
          (progressevenet.loaded * 100) / progressevenet.total
        );
        onProgressCallback(percentageCompleted);
      },
    }
  );
  return data;
}

export async function fetchHomeStudentCourseListService(query) {
  const { data } = await axiousInstance.get(
    `/api/v1/home/student/courses?${query}`
  );

  return data;
}

export async function fetchHomeStudentCourseDetailsService(id) {
  const { data } = await axiousInstance.get(
    `/api/v1/home/student/courses/details/${id}`
  );

  return data;
}
export async function getPurchaseStudentCourseInfo(id, studentId) {
  const { data } = await axiousInstance.get(
    `/api/v1/home/student/purchase-info/details/${id}/${studentId}`
  );

  return data;
}

export async function CreatePayemtCourseService(formdata) {
  const { data } = await axiousInstance.post(
    "/api/v1/home/student/order/create",
    {
      ...formdata,
    }
  );
  return data;
}
export async function CaptureFinalizePaymentService(
  paymentId,
  payerId,
  orderId
) {
  const { data } = await axiousInstance.post(
    "/api/v1/home/student/order/finalize",
    {
      paymentId,
      payerId,
      orderId,
    }
  );
  return data;
}

export async function studentPurchaseCoursesService(id) {
  const { data } = await axiousInstance.get(
    `/api/v1/home/student/mycourse/get/${id}`
  );

  return data;
}

export async function studentCourseProgressService(userId, courseId) {
  const { data } = await axiousInstance.get(
    `/api/v1/home/course-progress/get/${userId}/${courseId}`
  );

  return data;
}
export async function MarkedCurrentLectureViewedService(
  userId,
  courseId,
  lectureId
) {
  const { data } = await axiousInstance.post(
    `/api/v1/home/course-progress/mark-lecture-view`,
    {
      userId,
      courseId,
      lectureId,
    }
  );

  return data;
}
export async function resetStudentCourseService(userId, courseId) {
  const { data } = await axiousInstance.post(
    `/api/v1/home/course-progress/reset-course`,
    {
      userId,
      courseId,
    }
  );

  return data;
}
