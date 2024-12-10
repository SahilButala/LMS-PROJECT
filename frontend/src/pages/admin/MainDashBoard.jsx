import { BarChart, Book, LogOut } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import DashBoardView from "../../components/dashboard-view/DashBoardView";
import Courses from "@/pages/admin/Courses/allCoursesList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { LoginRegister } from "@/Context/auth/Register";
import { AdminContext } from "@/Context/admin/AdminContext";
import { fetchAdminCourseListService } from "@/services/api-services";
import { toast } from "react-toastify";

const DashBoard = () => {
  // all variables
  const [activetab, setactiveTab] = useState("dashboard");
  const { resetCreadentials } = useContext(LoginRegister);
  const { adminCourseList, setAdminCourseList } = useContext(AdminContext);

  // all data that requried
  const MenueItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <DashBoardView listCoursess={adminCourseList}   />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "Courses",
      component: <Courses listCoursess={adminCourseList} />,
    },
    {
      icon: LogOut,
      label: "LogOut",
      value: "LogOut",
      component: null,
    },
  ];



  // all functions
  const handleLogout = () => {
    toast.success("logout Successfully...")
    resetCreadentials();
  };

  async function fetchCourses() {
    const res = await fetchAdminCourseListService();
    console.log(res);
    if (res.success) setAdminCourseList(res.data);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="flex h-full  min-h-screen bg-gray-100">
      <aside className="md:w-72 bg-slate-200 shadow-md  md:block">
        <div className="p-5">
          <h2 className="text-[22px] font-semibold">DashBoard</h2>
          <menu className="flex flex-col gap-3 mt-3">
            {MenueItems.map((item) => (
              <Button
                key={item.value}
                onClick={
                  item.value === "LogOut"
                    ? handleLogout
                    : () => setactiveTab(item.value)
                }
              >
                <item.icon className="mr-4 h-4 w-4 capitalize" />
                {item.label}
              </Button>
            ))}
          </menu>
        </div>
      </aside>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="pl-5">
          <h1 className="mb-5 text-3xl capitalize mt-6 font-bold">dashboard</h1>
          <Tabs value={activetab} onValueChange={setactiveTab}>
            {MenueItems.map((item) => (
              <TabsContent key={item.label} value={item.value}>
                {item.component !== null ? item.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
