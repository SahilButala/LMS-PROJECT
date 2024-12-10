import React, { useContext } from 'react'
import { Button } from '../ui/button'
import { FaGraduationCap } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { getPurchaseStudentCourseInfo } from '@/services/api-services';
import { LoginRegister } from '@/Context/auth/Register';

function CoursesUi({CoursesData}) {
  const {auth} = useContext(LoginRegister)
  const navigate = useNavigate()
  async function handleCoursenavigate(getCurrentId){
    const res = await getPurchaseStudentCourseInfo(getCurrentId,auth?.user?._id)

    if(res.success){
      if(res.data){
        navigate(`/course-progress/${getCurrentId}`)
      }else{
        navigate(`/course-details/${getCurrentId}`)
      }
    }

     

  }

    console.log("res",CoursesData)
  return (
    <section className='secpad'>
        <div className="coureses-box">
            <div className="upper-sec">
                <h2 className='text-2xl font-semibold underline mb-1'>Featured courses</h2>
                <p className='text-[15px]'>Explore our Popular Courses</p>
            </div>

            <div className="lower-sec mt-8">
                <div className="boxses  grid grid-rows-[auto_1fr_auto_auto] md:grid-cols-2 lg:grid-cols-4 gap-3 min-h-[374px]">
              {
                CoursesData.map((course,index)=>(
                    <div key={index} className="box pb-7  p-2 border shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]  hover:translate-y-[-15px] transition-all cursor-pointer grid grid-rows-subgrid row-span-4">
                    <div className="image w-full h-[250] relative">
                         <img className='object-cover h-full ' src={course.image}
                         alt="" />
                        <Button variant={''} className='cursor-none absolute top-0  text-[14px]'>{course.category}</Button>
                    </div>
                    <div className="details">
                         <p className='titile pb-3 mt-3 text-xl font-medium'>{course.title}</p>
                           <div className="two-sec flex justify-between">
                               <div className="date flex items-center gap-1"><CiClock2 className='text-orange-600'/>{course.date.slice(0,10)}</div>
                               <div className="student-enroll flex items-center gap-1"> <FaGraduationCap className='text-orange-400' />{course.students.length || 0} students</div>
                           </div>
                           <p  className='capitalize mt-2 font-medium'>Created By : {course.instructorName}</p>
                    </div>
                    <hr className='mt-3 pb-5'/>

                    <div className="bottom-sec flex items-center justify-between">
                       <div className="price flex"><p className='font-medium '>Price : </p>156$</div>
                       <Button variant={''}
                        onClick={()=>
                          handleCoursenavigate(course._id)}
                       >
                           View More
                       </Button>
                      </div>

             </div>
                ))
              }
                </div>
            </div>
        </div>
    </section>
  )
}

export default CoursesUi