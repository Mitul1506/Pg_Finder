const userSchema = require("../models/UserModel")
const bcrypt = require("bcrypt")

const registerUser = async(req,res)=>{
    try{

        const hashedPassword = await bcrypt.hash(req.body.password,10)

        const savedUser = await userSchema.create({
            ...req.body,
            password:hashedPassword
        })

        res.status(201).json({
            message:"user created successfully",
            data:savedUser
        })

    }catch(err){
        res.status(500).json({
            message:"error while creating user",
            err:err
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
      user
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