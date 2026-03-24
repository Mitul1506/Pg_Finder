const roleMiddleware = (roles) => {
  return (req, res, next) => {
    try {

      const user = req.user 

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized"
        })
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          message: "Access denied"
        })
      }

      next()

    } catch (err) {
      res.status(500).json({
        message: "Role check error"
      })
    }
  }
}

module.exports = roleMiddleware