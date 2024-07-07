require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
   
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "You are not authorized to perform this action. Please log in again"
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = validToken;
   
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token. Please log in again"
    });
  }
};

module.exports = authMiddleware;
