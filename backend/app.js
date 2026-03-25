const express = require("express")
const app = express()
const cors = require("cors")

require("dotenv").config()
app.use(express.json())
app.use(cors()) 

const DBConnection = require("./src/utils/DBConnection")
DBConnection()

const userRoutes = require("./src/routes/UserRoutes")
const pgRoutes = require("./src/routes/PgRoutes")
const roomRoutes = require("./src/routes/RoomRoutes")
const bookingRoutes = require("./src/routes/BookingRoutes")
const paymentRoutes = require("./src/routes/PaymentRoutes")
const reviewRoutes = require("./src/routes/ReviewRoutes")

const notificationRoutes = require("./src/routes/NotificationRoutes")
const reportRoutes = require("./src/routes/ReportRoutes")
const disputeRoutes = require("./src/routes/DisputeRoutes")
const mediaRoutes = require("./src/routes/MediaRoutes")

app.use("/media",mediaRoutes)

app.use("/user", userRoutes)
app.use("/pgs", pgRoutes)
app.use("/rooms", roomRoutes)
app.use("/bookings", bookingRoutes)
app.use("/payments", paymentRoutes)
app.use("/reviews", reviewRoutes)

app.use("/notifications", notificationRoutes)
app.use("/reports", reportRoutes)
app.use("/disputes", disputeRoutes)




const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})
