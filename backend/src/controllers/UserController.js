const userSchema = require("../models/UserModel")
const bcrypt = require("bcrypt")
const mailSend = require("../utils/MailUtil")

const registerUser = async (req, res) => {

  try {

    const { firstName, lastName, email, password } = req.body

    // Check if user already exists
    const existingUser = await userSchema.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email"
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const savedUser = await userSchema.create({
      firstName,
      lastName,
      email,
     
      password: hashedPassword
    })

  


await mailSend(
  email,
  "Welcome to PG Finder",
  `Hello ${firstName}, your account has been created successfully. Welcome to PG Finder!`
)

    res.status(201).json({
      message: "User created successfully",
      data: {
        id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        phone: savedUser.phone
      }
    })

  } catch (err) {

    res.status(500).json({
      message: "Error while creating user",
      error: err.message
    })

  }

}


const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body

    const user = await userSchema.findOne({ email })

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      })
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {

    res.status(500).json({
      message: "Login error",
      error: error.message
    })

  }
}

module.exports = {
  registerUser,
  loginUser
}