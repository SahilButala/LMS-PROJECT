import userDetails from "../models/User_auth.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

// all functions

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // check user enter name and email
    if (!name || !email) {
      return res.json({
        success: false,
        message: "enter the name and email !..",
      });
    }
    // checking if email already exsist in db
    const exsistingEmail = await userDetails.findOne({ email });
    if (exsistingEmail)
      return res.json({ success: false, message: "email already exsist...!" });
    // passsword validation
    if (password.length < 8)
      return res.json({
        success: false,
        message: "password is very short it must be greater than 8 character",
      });

    // hashing password with bycrypt
    const salt = await bycrypt.genSalt(10);
    const hashedPass = await bycrypt.hash(password, salt);

    // createing new user
    const newUser = new userDetails({
      name,
      email,
      role,
      password: hashedPass,
    });

    await newUser.save();
    // const token = createToken(SaveUser._id, SaveUser.role);
    const data = {
      name,
      email,
      role,
    };

    res.json({
      success: true,
      message: "user add successfully...",
      data: data,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: err.message || "something went wrong...!",
    });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking email already present in db or not
    const user = await userDetails.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "email cant't found please try again...!",
      });

      // verify the password using bycrypt
    }
    const matchpass = await bycrypt.compare(password, user.password);
    if (!matchpass) {
      return res.json({
        success: false,
        message: "you enter wrong password ,  please try again...",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        userName: user.name,
        userEmail: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "120m",
      }
    );

  return res.json({
      success: true,
      message: "login successfully...!",
      data: {
        token,
        user: {
          email,
          role: user.role,
          name: user.name,
          userId: user._id,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "something went wrong...!" || error.message,
    });
  }
};

export { RegisterUser, LoginUser };
