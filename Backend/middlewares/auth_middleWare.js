// import jwt from "jsonwebtoken";
// const verifyToken = (token, secretKey) => {
//   return jwt.verify(token, secretKey);
// };

//     // this middleware check user is authinticated or not
// const isUserAuthinticatedOrNot = (req, res, next) => {
//   const authHeader = req.headers.authorization;
  

//   if (!authHeader) {
//     return res.status(401).json({
//       success: false,
//       message: "User is not authenticated",
//     });
//   }
//   const token = authHeader.split(" ")[1];
  
//   try {
//     const payload = verifyToken(token,process.env.JWT_SECRET);

//     req.user = payload;

//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export default isUserAuthinticatedOrNot;

import jwt from 'jsonwebtoken';

const verifyToken = (token, JWT_SECRET) => {
    return jwt.verify(token, JWT_SECRET);
};

// Middleware to check if a user is authenticated
const isUserAuthinticatedOrNot = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.json({
                success: false,
                message: "User not authenticated. Authorization header missing.",
            });
        }

        const token = authHeader.split(' ')[1]; // Extract token
        if (!token) {
            return res.json({
                success: false,
                message: "User not authenticated. Token missing.",
            });
        }

        const payload = verifyToken(token, process.env.JWT_SECRET); // Verify token
        req.user = payload; // Attach user data to request object
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error.message);
        return res.json({
            success: false,
            message: "Invalid token or user not authenticated.",
        });
    }
};

export default isUserAuthinticatedOrNot;


