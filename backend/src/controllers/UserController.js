const userSchema = require("../models/UserModel")
const bcrypt = require("bcrypt")
const mailSend = require("../utils/MailUtil")
const User = require("../models/UserModel")
// const jwt = require("jsonwebtoken")



const registerUser = async (req, res) => {

  try {

    const { firstName, lastName, email, password, role } = req.body

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
      role, // ✅ added role
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
        phone: savedUser.phone,
        role: savedUser.role // ✅ optional but useful
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
    // const token = jwt.sign(
    //         { id:user._id, role:user.role },
    //         process.env.JWT_SECRET,
    //         { expiresIn:"1d" }
    //     )

    res.status(200).json({
      message: "Login successful",
      // token,
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
// GET ALL USERS
const getAllUsers = async (req, res) => {

  try {

    const users = await User.find()

    res.status(200).json({
      message: "Users fetched successfully",
      data: users
    })

  } catch (error) {

    res.status(500).json({
      message: "Error fetching users",
      error: error.message
    })

  }

}


// GET USER BY ID
const getUserById = async (req, res) => {

  try {

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    res.status(200).json({
      message: "User fetched successfully",
      data: user
    })

  } catch (error) {

    res.status(500).json({
      message: "Error fetching user",
      error: error.message
    })

  }

}
const deleteUser = async (req, res) => {

  try {

    const { id } = req.params

    const deletedUser = await userSchema.findByIdAndDelete(id)

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser
    })

  } catch (err) {

    res.status(500).json({
      message: "Error deleting user",
      error: err.message
    })

  }

}


module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser
}