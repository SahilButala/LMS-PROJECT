import paypal from "../helper/Paypal.js";
import Order from "../models/Order.js";
import studentcourse from "../models/StudentCourse.js";
import Course from "../models/Create_Course.js";

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      orderStauts,
      paymentMethod,
      paymentStatus,
      orderDate,
      paymentId,
      payerId,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    } = req.body;

    const create_Payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_URL}/payment-return`,
        cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: courseTitle,
                sku: courseId,
                price: coursePricing,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: coursePricing.toFixed(2),
          },
          description: courseTitle,
        },
      ],
    };

    paypal.payment.create(create_Payment_json, async (error, paymetInfo) => {
      if (error) {
        console.log("error", error);
        return res.json({
          success: false,
          message: "Error while creating paypal payment ! ",
        });
      } else {
        const newCreatedCourseOrder = new Order({
          userId,
          userName,
          userEmail,
          orderStauts,
          paymentMethod,
          paymentStatus,
          orderDate,
          paymentId,
          payerId,
          instructorId,
          instructorName,
          courseImage,
          courseTitle,
          courseId,
          coursePricing,
        });
        await newCreatedCourseOrder.save();

        const approveUrl = paymetInfo.links.find(
          (link) => link.rel == "approval_url"
        ).href;

        res.json({
          success: true,
          data: {
            approveUrl ,
            orderId: newCreatedCourseOrder._id,
          },
        });
      }
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const capturePaymentFinalOrder = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    await order.save();

    //update out student course model
    const studentCourses = await studentcourse.findOne({
      userId: order.userId,
    });

    if (studentCourses) {
      studentCourses.courses.push({
        courseId: order.courseId,
        title: order.courseTitle,
        instructorId: order.instructorId,
        instructorName: order.instructorName,
        dateOfPurchase: order.orderDate,
        courseImage: order.courseImage,
      });

      await studentCourses.save();
    } else {
      const newStudentCourses = new studentcourse({
        userId: order.userId,
        courses: [
          {
            courseId: order.courseId,
            title: order.courseTitle,
            instructorId: order.instructorId,
            instructorName: order.instructorName,
            dateOfPurchase: order.orderDate,
            courseImage: order.courseImage,
          },
        ],
      });

      await newStudentCourses.save();
    }

    //update the course schema students
    await Course.findByIdAndUpdate(order.courseId, {
      $addToSet: {
        students: {
          studentId: order.userId,
          studentName: order.userName,
          studentEmail: order.userEmail,
          paidAmount: order.coursePricing,
        },
      },
    });

    res.json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export { createOrder, capturePaymentFinalOrder };
