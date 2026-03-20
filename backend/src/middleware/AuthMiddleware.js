const jwt = require("jsonwebtoken")

const secret = "secret" // ⚠️ same as used in UserController

const validateToken = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization

    // ❌ No token
    if (!authHeader) {
      return res.status(401).json({
        message: "Token not present"
      })
    }

    // ❌ Not Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token must be Bearer"
      })
    }

    // ✅ Extract token
    const token = authHeader.split(" ")[1]

    // ✅ Verify token
    const decodedData = jwt.verify(token, secret)

    // 🔥 IMPORTANT: attach user data
    req.user = decodedData

    next()

  } catch (err) {
    console.log("Auth Error:", err)

    return res.status(401).json({
      message: "Invalid or expired token"
    })
  }
}

module.exports = validateToken