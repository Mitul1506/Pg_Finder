const Booking = require("../models/BookingModel");
const Room = require("../models/RoomModel");


const createBooking = async (req, res) => {
  try {
    const { userId, pgId, roomId } = req.body;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.availableBeds <= 0) {
      return res.status(400).json({ message: "Room full" });
    }

    
    const existing = await Booking.findOne({
      userId,
      roomId,
      status: { $ne: "cancelled" }
    });

    if (existing) {
      return res.status(400).json({
        message: "You already booked this room"
      });
    }

    const booking = await Booking.create({
      userId,
      pgId,
      roomId,
      status: "pending"
    });

    res.status(201).json({
      message: "Booking request sent",
      data: booking
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Booking failed"
    });
  }
};


const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("pgId")
      .populate("roomId");

    res.json({
      message: "Bookings fetched",
      data: bookings
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching bookings",
      error: err.message
    });
  }
};


const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Already cancelled" });
    }

    const room = await Room.findById(booking.roomId);

    
    if (booking.status === "confirmed") {
      room.availableBeds += 1;
      await room.save();
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      message: "Booking cancelled"
    });

  } catch (err) {
    res.status(500).json({
      message: "Error cancelling booking"
    });
  }
};


const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body; 

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const room = await Room.findById(booking.roomId);

    
    if (status === "confirmed") {
      if (room.availableBeds <= 0) {
        return res.status(400).json({ message: "No beds available" });
      }

      
      if (booking.status !== "confirmed") {
        room.availableBeds -= 1;
        await room.save();
      }
    }

   
    if (status === "cancelled") {
      if (booking.status === "confirmed") {
        room.availableBeds += 1;
        await room.save();
      }
    }

    booking.status = status;
    await booking.save();

    res.json({
      message: `Booking ${status}`,
      data: booking
    });

  } catch (err) {
    res.status(500).json({
      message: "Error updating booking status"
    });
  }
};


const getBookingsByLandlord = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("roomId")
      .populate("pgId")
      .populate("userId");

    const filtered = bookings.filter(
      (b) =>
        b.pgId?.landlordId?.toString() === req.params.landlordId
    );

    res.status(200).json({
      message: "Landlord bookings fetched",
      data: filtered
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching landlord bookings",
      error: err.message
    });
  }
};
const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting booking" });
  }
};
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId")
      .populate("pgId")
      .populate("roomId");

    res.status(200).json({
      message: "All bookings fetched",
      data: bookings
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching bookings",
      error: err.message
    });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  cancelBooking,
  getBookingsByLandlord,
  updateBookingStatus,
  deleteBooking ,
  getAllBookings
};