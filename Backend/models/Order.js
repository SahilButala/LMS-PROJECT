import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type : String,
        required: true,  
    },
    userName: String,
    userEmail: String,
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    orderDate: Date,
    paymentId: String,
    payerId: String,
    instructorId: String,
    instructorName: String,
    courseImage: String,
    courseTitle: String,
    courseId: String,
    coursePricing: String,

})


const orderSchema = mongoose.model.orderSchema || mongoose.model("orderSchema", OrderSchema);

export default orderSchema