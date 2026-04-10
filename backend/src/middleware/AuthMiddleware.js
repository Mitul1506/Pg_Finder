const jwt = require("jsonwebtoken");
const User = require("../models/UserModel"); // Add this import

const secret = "secret";

const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token not present"
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token must be Bearer"
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedData = jwt.verify(token, secret);

    // ✅ IMPORTANT: Fetch full user from database
    const user = await User.findById(decodedData.id).select("-password");
    
    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    // Attach both decoded token data and full user object
    req.user = {
      id: user._id,
      _id: user._id, // For consistency
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      ...decodedData
    };

    next();
  } catch (err) {
    console.log("Auth Error:", err);

    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = validateToken;