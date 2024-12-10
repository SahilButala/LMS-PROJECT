import React, { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { MdMenuBook } from "react-icons/md";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { AiOutlineMenu } from "react-icons/ai";
import { LoginRegister } from "@/Context/auth/Register";
import { RxCross2 } from "react-icons/rx";
const NavBar = () => {
  const { resetCreadentials } = useContext(LoginRegister);
  const [active, setactive] = useState("home");

  const [openCloseMenue , setopenCloseMenue] = useState(false)

  const handleLogout = () => {
    toast.success("logout Successfully...");
    resetCreadentials();
  };
  return (
    <div>
      <div className="navbar flex items-center justify-between py-4 ">
        <div className="logo flex gap-2">
          <img src={logo} alt="" />
          <p className="font-bold text-2xl">EduPress</p>
        </div>

        <div className="menue text-2xl  block lg:hidden">
              <AiOutlineMenu className=""
                onClick={()=>setopenCloseMenue(true)}
              />
        </div>

        {/* for mobile */}
        {
          openCloseMenue ?  <div className="">
          <div className="nav-links h-screen w-60  absolute right-0 top-0 bg-white lg:hidden transition-all">
           <RxCross2 className="text-xl ml-2 mt-4 cursor-pointer"
            onClick={()=>setopenCloseMenue(false)}
           />
          <ul className="text-[16px] flex items-center mt-32 flex-col  gap-4 capitalize font-semibold">
            <Link
              to={"/home"}
              className={`${active === "home" ? "isactive" : ""}`}
              onClick={() => setactive("home")}
            >
              home
            </Link>
            
            <Link
              className={`${active === "courses" ? "isactive" : ""}`}
              to={"/courses"}
              onClick={() => setactive("courses")}
            >
              <span className="text-orange-400">Explore</span>-Courses
            </Link>
          </ul>
        </div>
        </div> : ''
        }
       

        <div className="nav-links hidden  lg:block">
          <ul className="text-[16px] flex gap-4 capitalize font-semibold">
            <Link
              to={"/home"}
              className={`${active === "home" ? "isactive" : ""}`}
              onClick={() => setactive("home")}
            >
              home
            </Link>
         
            <Link
              className={`${active === "courses" ? "isactive" : ""}`}
              to={"/courses"}
              onClick={() => setactive("courses")}
            >
              <span className="text-orange-400">Explore</span>-Courses
            </Link>
          </ul>
        </div>

        <div className="right-sec">
          <div className="flex items-center gap-6">
            <div className="coursses flex items-center gap-5">
              <MdMenuBook />
              <Link to={'/StudentCoursePage'} 
               onClick={() => setactive("My Coursses")}
              className={`${active === "My Coursses" ? "isactive" : ""} font-bold`}>My Coursses </Link>
            </div>
            <Button onClick={handleLogout}>Sign Out</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
