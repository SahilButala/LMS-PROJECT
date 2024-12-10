import express from 'express'
import { LoginUser, RegisterUser } from '../../controllers/User_controller.js'
import isUserAuthinticatedOrNot from '../../middlewares/auth_middleWare.js'
const userRoute = express.Router()


userRoute.post('/register',RegisterUser)
userRoute.post('/login',LoginUser)
userRoute.get('/check-auth',isUserAuthinticatedOrNot,(req,res)=>{
   try {
      const user = req.user;
      if (!user) {
          return res.status(401).json({
              success: false,
              message: "User is not authenticated.",
          });
      }

      return res.status(200).json({
          success: true,
          message: "Authenticated User!",
          data: {user}, 
      });
  } catch (error) {
      console.error("Error in authentication controller:", error.message);
      return res.status(500).json({
          success: false,
          message: "Failed to check user authentication.",
      });
  }
})


export default userRoute
