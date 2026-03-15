const bookingModel = require("../models/BookingModel")
const roomModel = require("../models/RoomModel")
const userModel = require("../models/UserModel") 


// CREATE BOOKING
const createBooking = async (req, res) => {

try {

const { roomId, tenantId } = req.body

// VALIDATION
if(!roomId || !tenantId){
return res.status(400).json({
message:"roomId and tenantId are required"
})
}

// CHECK ROOM
const room = await roomModel.findById(roomId)

if(!room){
return res.status(404).json({
message:"Room not found"
})
}

// CHECK BED AVAILABILITY
if(room.availableBeds <= 0){
return res.status(400).json({
message:"No beds available"
})
}

// CREATE BOOKING
const booking = await bookingModel.create({
roomId: room._id,
tenantId: tenantId,
pgId: room.pgId
})

// REDUCE BED COUNT
room.availableBeds = room.availableBeds - 1
await room.save()

res.status(201).json({
message:"Room booked successfully",
data: booking
})

} catch(err){

console.log("BOOKING ERROR:", err)

res.status(500).json({
message:"Booking failed",
error:err.message
})

}

}


// GET ALL BOOKINGS (ADMIN PURPOSE)
const getAllBookings = async (req, res) => {

try {

const bookings = await bookingModel
.find()
.populate("pgId")
.populate("roomId")
.populate("tenantId")

res.status(200).json({
message: "All bookings fetched",
data: bookings
})

} catch (err) {

res.status(500).json({
message: "Error fetching bookings",
error: err.message
})

}

}



// GET BOOKINGS BY USER
const getBookingsByUser = async (req, res) => {

try {

const bookings = await bookingModel
.find({ tenantId: req.params.userId })
.populate("pgId")
.populate("roomId")

res.status(200).json({
message: "User bookings fetched",
data: bookings
})

} catch (err) {

res.status(500).json({
message: "Error fetching user bookings",
error: err.message
})

}

}



// CANCEL BOOKING
const cancelBooking = async (req, res) => {

try {

const booking = await bookingModel.findById(req.params.id)

if (!booking) {
return res.status(404).json({
message: "Booking not found"
})
}

// FIND ROOM
const room = await roomModel.findById(booking.roomId)

if (room) {
room.availableBeds = room.availableBeds + 1
await room.save()
}

// DELETE BOOKING
await bookingModel.findByIdAndDelete(req.params.id)

res.status(200).json({
message: "Booking cancelled successfully"
})

} catch (err) {

res.status(500).json({
message: "Error cancelling booking",
error: err.message
})

}

}


module.exports = {
createBooking,
getAllBookings,
getBookingsByUser,
cancelBooking
}