import ProgressBar from '@/components/Progress_bar/ProgressBar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AdminContext } from '@/Context/admin/AdminContext'
import { mediaUploadProcessService } from '@/services/api-services'
import React, { useContext } from 'react'

const Settings = () => {

  const { landingPageFormData, setlandingPageFormData , mediaUploadProcess,setmediaUploadProcess ,   mediaProgressBarForUser,setmediaProgressBarForUser} =
    useContext(AdminContext);
  const handleImageUpload = async (e)=>{
               const selectedImage = e.target.files[0]
               if(selectedImage){
                   const formdata = new FormData()
                   formdata.append('file',selectedImage)
                    
                   try {
                     setmediaUploadProcess(true)
                         const res = await mediaUploadProcessService(formdata,setmediaProgressBarForUser)
                         if(res.success){
                            setlandingPageFormData({
                                ...landingPageFormData,
                                image : res?.data?.url
                            })
                            setmediaUploadProcess(false)
                         }
                   } catch (error) {
                       console.log('error', error)
                   }
               }

  }
  console.log(landingPageFormData)
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className='mb-4'>
            Course Settings
          </CardTitle>
          {
            mediaUploadProcess ? <ProgressBar
               isMediaUplaoding={mediaUploadProcess}
               progress={mediaProgressBarForUser}
            /> : null
          }
        </CardHeader>

        <CardContent>
                    {
                      landingPageFormData?.image ? <img src={landingPageFormData.image}/> : <div>
                      <Label>UpLoad Course Image</Label>
                      <Input
                       type='file'
                       accept='image/*'
                       className='mt-4'
                       onChange={(e)=>handleImageUpload(e)}
                      />
                  </div>
                    }
                  
        </CardContent>
      </Card>
    </div>
  )
}

export default Settings