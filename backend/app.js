const express = require("express")
const app = express()
const cors = require("cors")
//load env file.. using process
require("dotenv").config()
app.use(express.json())
app.use(cors()) //allow all requests

const DBConnection = require("./src/utils/DBConnection")
DBConnection()

const userRoutes = require("./src/routes/UserRoutes")
const pgRoutes = require("./src/routes/PgRoutes")
const roomRoutes = require("./src/routes/RoomRoutes")
const bookingRoutes = require("./src/routes/BookingRoutes")
const paymentRoutes = require("./src/routes/PaymentRoutes")
const reviewRoutes = require("./src/routes/ReviewRoutes")
const messageRoutes = require("./src/routes/MessageRoutes")
const notificationRoutes = require("./src/routes/NotificationRoutes")
const reportRoutes = require("./src/routes/ReportRoutes")
const disputeRoutes = require("./src/routes/DisputeRoutes")

app.use("/user", userRoutes)
app.use("/pgs", pgRoutes)
app.use("/rooms", roomRoutes)
app.use("/bookings", bookingRoutes)
app.use("/payments", paymentRoutes)
app.use("/reviews", reviewRoutes)
app.use("/messages", messageRoutes)
app.use("/notifications", notificationRoutes)
app.use("/reports", reportRoutes)
app.use("/disputes", disputeRoutes)




const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})
//server creation