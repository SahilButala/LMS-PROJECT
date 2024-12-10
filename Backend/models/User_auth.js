import mongoose from "mongoose";

const User_auth = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },  
  role:{
    type:String,
    default : "user"
  }
},);

const userDetails = mongoose.model.user || mongoose.model("user", User_auth);

export default userDetails;
