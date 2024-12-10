import Banner from '@/components/home-view/Banner'
import CategoriesSec from '@/components/home-view/CategoriesSec'
import CoursesUi from '@/components/home-view/CoursesUi'
import { HomeViewContext } from '@/Context/Home-View/HomeViewContext'
import { fetchHomeStudentCourseListService } from '@/services/api-services'
import React, { useContext, useEffect } from 'react'

const Home = () => {
  const {studentCourseList, setstudentCourseList} = useContext(HomeViewContext)

  const fetchStudentAllCouresses = async ()=>{
       const res = await fetchHomeStudentCourseListService()
       
       if(res?.success) setstudentCourseList(res?.data)
  }

useEffect(()=>{
        fetchStudentAllCouresses()  
},[])
  return (
    <div className='container mx-auto px-2'>
         <Banner/>
         <CategoriesSec/>
         <CoursesUi CoursesData={studentCourseList}  />
    </div>
  )
}

export default Home