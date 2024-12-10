import { deleteMedia, uplaodMedia } from "../helper/Cloudinary.js"

const ToUploadMedia= async (req,res)=>{
    try {
        const result = await uplaodMedia(req.file.path) 
        return res.status(200).json({
              success : true,
              data : result,
              message : "your file has been uploaded to cloudinary..."
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error to upload" || error.message
        })
    }
}

const ToDeleteMedia = async (req,res)=>{
    try {
        const {id} = req.params
        if(!id){
            return res.json({
                success : false,
                message : 'assest Id is required to delete '
            })
        }
        await deleteMedia(id)
        return res.status(200).json({
            success : true,
            message : "assest delete successfully from cloudinary"
      })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "failed to delete assest from cloudinary" || error.message
        })
    }
}

export {ToDeleteMedia,ToUploadMedia}