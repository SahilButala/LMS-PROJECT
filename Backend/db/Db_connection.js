import mongoose from "mongoose";

export const ConnectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI).then(()=>console.log("db connected"))
    }
     catch (error) {
        console.log(error)
    }
}