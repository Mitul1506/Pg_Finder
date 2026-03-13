import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function RoomList() {

  const [rooms, setRooms] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))

  // Fetch rooms
  const getRooms = async () => {
    try {

      const res = await axios.get("http://localhost:3000/rooms")

      setRooms(res.data.data)

    } catch (error) {

      console.log(error)
      toast.error("Failed to load rooms")

    }
  }

  useEffect(() => {
    getRooms()
  }, [])

  // Book room
  const bookRoom = async (roomId) => {

    if (!user) {
      toast.error("Please login first")
      return
    }

    try {

      await axios.post("http://localhost:3000/bookings", {

        roomId: roomId,
        tenantId: user._id

      })

      toast.success("Room booked successfully")

    } catch (error) {

      toast.error("Booking failed")

    }

  }

  return (

    <div className="bg-gray-100 min-h-screen p-10">

      <h1 className="text-3xl font-bold text-center mb-10">
        Available Rooms
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {rooms.map((room) => (

          <div
            key={room._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300"
          >

            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
              alt="room"
              className="w-full h-48 object-cover rounded-t-xl"
            />

            <div className="p-5">

              <h2 className="text-xl font-semibold mb-2">
                {room.roomType} Room
              </h2>

              <p className="text-gray-600 mb-2">
                Beds: {room.beds}
              </p>

              <p className="text-gray-600 mb-2">
                Rent: ₹{room.rent}
              </p>

              <p className="text-gray-600 mb-4">
                Deposit: ₹{room.deposit}
              </p>

              <button
                onClick={() => bookRoom(room._id)}
                className="bg-indigo-600 text-white w-full py-2 rounded-lg hover:bg-indigo-700"
              >
                Book Room
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}