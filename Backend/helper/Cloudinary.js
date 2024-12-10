
import { v2 as cloudinary } from 'cloudinary'

// configuration
cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME || 'dpomj4vk4',
    api_key : process.env.CLOUDINARY_API_KEY || '635195142416827',
    api_secret : process.env.CLOUDINARY_API_SECRET || '_7QVM3tH6orWxJqktIPxmD6OIc0'
})


// to uplaod cloudinary 
export const uplaodMedia = async (filepath)=>{
     try {
            const result  = await cloudinary.uploader.upload(filepath,{
                resource_type : 'auto'
            })
            return result

     } catch (error) {
         console.log(error)
         throw new Error('Error uploding to cloudinary')
     }
}

// to delete media into cloudinary
export const deleteMedia = async (publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId)

 } catch (error) {
     console.log(error)
     throw new Error('Error to  delete assets  from cloudinary')
 }
} 