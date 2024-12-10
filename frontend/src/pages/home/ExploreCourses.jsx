import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { filterOptions, sortOptions } from "@/config";
import { HomeViewContext } from "@/Context/Home-View/HomeViewContext";
import { fetchHomeStudentCourseListService, getPurchaseStudentCourseInfo } from "@/services/api-services";
import { ArrowUpDown } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { LoginRegister } from "@/Context/auth/Register";

const HomeStudentCoursesPage = () => {
  const [sort, setsort] = useState("price-lowtohigh");
  const { studentCourseList, setstudentCourseList , isloading,setisloading } =
    useContext(HomeViewContext);
  const [filter, setfilter] = useState({});
  // for setting url {params} according category
 const [searchParams,setsearchParams] = useSearchParams()
 const navigate = useNavigate()
 const {auth} = useContext(LoginRegister)
 const [input,setinput] = useState('')



  const fetchStudentAllCouresses = async (filter,sort) => {
    const query = new URLSearchParams({
      ...filter,
      sortBy :  sort
    })
    const res = await fetchHomeStudentCourseListService(query);

    if (res?.success){
      setisloading(false)
      setstudentCourseList(res?.data);
    }
  };

  useEffect(() => {
    if(filter !== null && sort !== null)
    fetchStudentAllCouresses(filter,sort);
  }, [filter,sort]);

  console.log("data", studentCourseList);

  function handleFilterChange(headCategoreyName, option) {
    let copyFilters = { ...filter };
    let indexofCurentSec = Object.keys(copyFilters).indexOf(headCategoreyName);

    if (indexofCurentSec === -1) {
      copyFilters = {
        ...copyFilters,
        [headCategoreyName]: [option.id],
      };
    } else {
      const indexOfCureentOption = copyFilters[headCategoreyName].indexOf(
        option.id
      );

      if (indexOfCureentOption === -1) {
        copyFilters[headCategoreyName].push(option.id);
      } else {
        copyFilters[headCategoreyName].splice(indexOfCureentOption, 1);
      }
    }

    setfilter(copyFilters);
    sessionStorage.setItem("filter", JSON.stringify(copyFilters));
  }
  
  function createSearchParams(filterParam){
          let queryParams = [];
          for(const [key,value] of Object.entries(filterParam)){
            if(Array.isArray(value) && value.length > 0){
                const params = value.join(',')
                queryParams.push(`${key}=${encodeURIComponent(params)}`)
            }
          }

          return queryParams.join('&')
  }

function handleInputChange(value){
  setinput(value)
}


useEffect(()=>{
      let queryStringForfilter = createSearchParams(filter)
      setsearchParams(new URLSearchParams(queryStringForfilter))
},[filter])

useEffect(() => {
  return () => {
    sessionStorage.removeItem("filter");
  };
}, []);
useEffect(() => {
  setsort("price-lowtohigh");
  setfilter(JSON.parse(sessionStorage.getItem("filter")) || {});
}, []);


async function handleCourseNavigate(getCourseid){
    const res = await getPurchaseStudentCourseInfo(getCourseid,auth?.user?._id)

    if(res.success){
      if(res?.data){
        navigate(`/course-progress/${getCourseid}`)
      }else{
        navigate(`/course-details/${getCourseid}`)
      }

    }
}


  return (
    <div className="flex">
      <div className="main w-[75%] px-5 pt-3 ">
        {/*  top section */}
        <div className="top-sec flex justify-between items-center border-b-[1px] pb-4 border-black">
        <div className="">
        <h2 className="text-2xl font-semibold">All Courses</h2>
        </div>

          <div className="search relative flex items-center gap-5">
            {/* sort options */}
            <div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"outline"}>
                      <ArrowUpDown className="h-3 w-3" />
                      <span>Sort By</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuRadioGroup
                      value={sort}
                      onValueChange={(value) => setsort(value)}
                    >
                      {sortOptions.map((item) => (
                        <DropdownMenuRadioItem
                          className="font-medium"
                          value={item.id}
                          key={item.id}
                        >
                          {item.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* /search input */}
            
            <Input
              type="text"
              className="py-4 capitalize  px-3 border w-[270px] bg-white"
              placeholder="serach courses"
              onChange={(e)=>handleInputChange(e.target.value)}
            />
            
            <LuSearch className="absolute top-2 right-3" />
          </div>
          <p className="text-[17px] font-medium">{studentCourseList.length} Results</p>
        </div>

        {/* lower section */}
        <div className="lower-sec mt-7">
          <div className="boxses">
            {studentCourseList && studentCourseList?.length > 0 ? studentCourseList.filter((item)=>{
              if(item){
                return input.toLowerCase()  === '' ? item : item.title.toLowerCase().includes(input) 
              }
              return false
            }).map((item, index) => (
              <div key={index   } className="box hover:border border-[#FF782D] p-2 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] min-h-[250px] mt-4">
                <div className="two-sec flex h-full">
                  <div className="image relative w-[40%]">
                    <img
                      className="h-full object-cover mr-6"
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div className="details p-9 w-[60%] ">
                    <div className="titile text-2xl mb-2 font-semibold">
                      {item.title}
                    </div>
                    <div className="div flex items-center w-full mt-6  space-x-14">
                      <p className="time flex items-center gap-2">
                        <CiClock2 className="text-[#FF782D]" />
                        Created {item.date.slice(0, 10)}
                      </p>
                      <p className="studens flex items-center gap-2">
                        <FaGraduationCap className="text-[#FF782D]" />
                        Students : {item.students.length}
                      </p>
                      <div className="levels">
                        Level :{" "}
                        <b className="font-medium capitalize">{item.level}</b>
                      </div>
                    </div>

                    <div className="bottom border-t-[1px] border-gray-200 mt-10 flex items-center justify-between pt-6">
                      <div className="price">Price : {item.pricing}$</div>
                      <div>
                        <p className="lectures flex">
                          {`${item.curriculum.length} Lectures `}
                        </p>
                      </div>
                      <Button
                        onClick={()=>handleCourseNavigate(item._id)}
                      >View More</Button>
                    </div>
                  </div>
                </div>
              </div>
             )) : isloading ? <Skeleton/> : (<h1 className="text-center font-bold">Not Course are Found !</h1>)}
          </div>
        </div>
      </div>

      {/* filter section */}
      <aside className="t w-[25%] pt-3 pl-5 ">
        <h1 className="text-xl font-medium flex gap-1">
          {" "}
          <span className="text-[#FF782D]">*</span>Filters
        </h1>
        <div>
          {Object.keys(filterOptions).map((keyItem) => {
            return (
              <div className="">
                <h3 className="font-medium space-y-4 py-3 underline">
                  {keyItem.toLocaleUpperCase()}
                </h3>

                <div>
                  {filterOptions[keyItem].map((items, index) => (
                    <Label key={index} className="flex  gap-2 mt-2">
                      <Checkbox
                        checked={
                          filter &&
                          Object.keys(filter).length > 0 &&
                          filter[keyItem] &&
                          filter[keyItem].indexOf(items.id) > -1
                        }
                        onCheckedChange={() =>
                          handleFilterChange(keyItem, items)
                        }
                      />
                      {items.label}
                    </Label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div></div>
      </aside>
    </div>
  );
};

export default HomeStudentCoursesPage;
