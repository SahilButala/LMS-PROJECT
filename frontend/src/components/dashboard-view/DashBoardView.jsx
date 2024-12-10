import React from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { DollarSign, icons, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const DashBoardView = ({ listCoursess }) => {
  console.log("data---", listCoursess);
  const notify = () => toast("Wow so easy!");

  function CalculatedTotalStudents() {
    const { totalStudents, totalProfit, studentList } = listCoursess.reduce(
      (acc, course) => {
        const studentCount = course.students.length;
        acc.totalStudents += studentCount;
        acc.totalProfit += course.pricing * studentCount;

        course.students.forEach((student) => {
          acc.studentList.push({
            courseTitle: course.title,
            studentName: student.studentName,
            studentEmail: student.studentEmail,
          });
        });

        return acc;
      },
      {
        totalStudents: 0,
        totalProfit: 0,
        studentList: [],
      }
    );

    return {
      totalProfit,
      totalStudents,
      studentList,
    };
  }

  console.log(CalculatedTotalStudents());

  const config = [
    {
      icon: Users,
      label: "Total Students",
      value: CalculatedTotalStudents().totalStudents,
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: CalculatedTotalStudents().totalProfit,
    },
  ];

  // this is main page of dashboard where you get all students that enroll your courses
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {config.map((item, index) => (
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between ">
              <CardTitle>{item.label}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="font-medium text-2xl">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Students List </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Course Name</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
        {CalculatedTotalStudents().studentList.map((student) => (
          <TableRow key={student._id} className=''>
            <TableCell className="font-medium">{student.courseTitle}</TableCell>
            <TableCell>{student.studentName}</TableCell>
            <TableCell>{student.studentEmail}</TableCell>
          </TableRow>
        ))}
      </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashBoardView;
