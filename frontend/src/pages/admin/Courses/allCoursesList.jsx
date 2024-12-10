import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CurriculumInitialFormData, LandingInitialFormData } from "@/config";
import { AdminContext } from "@/Context/admin/AdminContext";
import { Delete, Edit } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Courses = ({ listCoursess }) => {
  const {
    currentEditedCourseId,
    setcurrentEditedCourseId,
    setlandingPageFormData,
    setcurriculumdata,
  } = useContext(AdminContext);
  console.log("data---", currentEditedCourseId);

  const navigate = useNavigate();
  return (
    <div className="w-[1200px]">
      <Card>
        <CardHeader className="flex items-center justify-between flex-row">
          <CardTitle className="text-2xl font-bold ">All Coursess </CardTitle>
          <Button
            onClick={() => {
              setcurrentEditedCourseId(null);
              setcurriculumdata(CurriculumInitialFormData);
              setlandingPageFormData(LandingInitialFormData);
              navigate("/admin/create-course");
            }}
          >
            + Create New Course{" "}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="tables overflow-x-auto">
            <Table>
              <TableCaption>A list of your recent Coursses.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Course Name</TableHead>
                  <TableHead className="">Students</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listCoursess && listCoursess.length > 0
                  ? listCoursess.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item?.students.length}</TableCell>
                        <TableCell>{item?.students.length * item.pricing}$</TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => {
                              navigate(`/admin/edit-course/${item?._id}`);
                            }}
                            variant="dark"
                          >
                            <Edit className="h-5 w-4" />
                          </Button>
                          <Button variant="red">
                            <Delete className="h-5 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Courses;
