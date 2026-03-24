const jwt = require("jsonwebtoken")

const secret = "secret" 

const validateToken = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization

  
    if (!authHeader) {
      return res.status(401).json({
        message: "Token not present"
      })
    }

   
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token must be Bearer"
      })
    }

    
    const token = authHeader.split(" ")[1]

    
    const decodedData = jwt.verify(token, secret)

    
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