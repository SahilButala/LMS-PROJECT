import { courseCategories } from '@/config'
import React, { useContext } from 'react'
import { Button } from '../ui/button';
import { getPurchaseStudentCourseInfo } from '@/services/api-services';
import { useNavigate } from 'react-router-dom';
import { LoginRegister } from '@/Context/auth/Register';



function CategoriesSec() {
    async function handleCourseNavigate(getCourseid){
           sessionStorage.removeItem('filter')
           const currentFilter = {
            category : [getCourseid]
           }

           sessionStorage.setItem('filter',JSON.stringify(currentFilter))
   navigate('/courses')
    }
    

    const navigate = useNavigate()
    const {auth} = useContext(LoginRegister)
    
  return (
    <div>
        <div className="Categories">
            <div className="header">
                <h2 className='text-2xl font-semibold underline mb-1'>Top Categories </h2>
                <p className='text-[15px]'>Explore our Popular Categories</p>
            </div>

            <div className="main md:grid-cols-4 sm:grid-cols-2  grid lg:grid-cols-5 gap-4 mt-6">
                {
                    courseCategories.map((categorey,index)=>(
                        <div key={index}>
                          <div className="categorey-sections-tabs   border opa border-orange-100 gap-4 flex flex-col justify-center text-center items-center h-[230px] hover:translate-y-[-12px] transition-all ">
                               <div className="logo h-24 w-24">
                                <img className='w-full h-full object-cover'  src={categorey.image} alt="" />
                               </div>
                                <Button
                                 onClick={()=>handleCourseNavigate(categorey?.id)}
                                variant={'ghost'} className={`text-[16px]`}>{categorey.label}</Button>
                          </div>

                    </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default CategoriesSec