import express from 'express'
import multer from 'multer'
import { ToDeleteMedia, ToUploadMedia } from '../../controllers/Cloudinary_controller.js'
import { uplaodMedia } from '../../helper/Cloudinary.js'
// import ToUplaodbulkCourses from '../../controllers/ToUplaodbulkCourses.js'

const admin_Route = express.Router() 


const uplaod = multer({dest: 'uploads/'})

admin_Route.post('/upload',uplaod.single('file'),ToUploadMedia)
admin_Route.delete('/delete/:id',ToDeleteMedia)
admin_Route.post('/bulkUpload',uplaod.array("files", 10),async(req,res)=>{
  try {
    // Loop through each file and upload it to Cloudinary
    const files = req.files;
    const uploadPromises = files.map((file) => uplaodMedia(file.path));

    // Wait for all files to be uploaded
    const result = await Promise.all(uploadPromises);

    return res.status(200).json({
      success: true,
      data: result,
      message: "Files have been uploaded to Cloudinary successfully!"
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading files to Cloudinary" || error.message
    });
  }
})


export default admin_Route