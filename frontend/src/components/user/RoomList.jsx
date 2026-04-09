import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function RoomList(){

  const [rooms,setRooms] = useState([])
  const [pg,setPg] = useState(null)
  const [message,setMessage] = useState("")

  const { pgId } = useParams()
  const navigate = useNavigate()

  // ================= GET ROOMS =================
  const getRooms = async()=>{
    try{
      const res = await axios.get(`http://localhost:3000/rooms/pg/${pgId}`)
      setRooms(res.data.data)
    }catch(err){
      toast.error("Failed to load rooms")
    }
  }

  // ================= GET PG DETAILS =================
  const getPgDetails = async()=>{
    try{
      const res = await axios.get(`http://localhost:3000/pgs/${pgId}`)
      setPg(res.data.data)
    }catch(err){
      toast.error("Failed to load PG details")
    }
  }

  useEffect(()=>{
    getRooms()
    getPgDetails()
  },[])

  // ================= SEND MESSAGE =================
  const handleSendMessage = async()=>{
    try{

      const user = JSON.parse(localStorage.getItem("user"))

      if(!user){
        toast.error("Please login first")
        navigate("/login", { state: { from: `/RoomList/${pgId}` } })
        return
      }

      if(!message.trim()){
        toast.error("Message cannot be empty")
        return
      }

      await axios.post("http://localhost:3000/messages",{
        senderId:user.id,
        receiverId:pg.landlordId._id,
        pgId:pg._id,
        message
      })

      toast.success("Message sent ✅")
      setMessage("")

    }catch(err){
      toast.error("Failed to send message")
    }
  }

  return(

    <div className="pt-24 px-10 bg-gray-100 min-h-screen">

      {/* ================= PG TITLE ================= */}
      <div className="text-center mb-10">

        <h1 className="text-3xl font-bold text-indigo-700">
          {pg?.pgName || "PG Rooms"}
        </h1>

        <p className="text-gray-600 mt-2">
          {pg?.address?.area}, {pg?.address?.city}
        </p>

        <p className="text-lg text-gray-700 mt-2 font-semibold">
          Available Rooms
        </p>

      </div>

      {/* ================= ROOMS ================= */}
      <div className="grid md:grid-cols-3 gap-8">

        {rooms.map((room)=>(

          <div
            key={room._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
          >

            {/* IMAGE */}
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
              alt="room"
              className="h-48 w-full object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-semibold mb-2">
                {room.roomType} Room
              </h2>

              <p className="text-gray-600">
                Total Beds: {room.totalBeds}
              </p>

              <p className="text-gray-600">
                Available Beds: {room.availableBeds}
              </p>

              <p className="text-indigo-600 font-bold text-lg mt-2">
                ₹ {room.monthlyRent} / month
              </p>

              <p className="text-gray-600 mb-2">
                Deposit: ₹ {room.deposit}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {room.roomAmenities?.map((a,index)=>(
                  <span
                    key={index}
                    className="bg-gray-200 text-xs px-2 py-1 rounded"
                  >
                    {a}
                  </span>
                ))}
              </div>

              <div className="mt-4">
                <button
                  onClick={()=>navigate(`/room/${room._id}`)}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  View Details
                </button>
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* ================= MESSAGE OWNER ================= */}
      {pg?.landlordId && (
        <div className="bg-white p-6 rounded-xl shadow mt-12 max-w-lg mx-auto">

          <h2 className="text-xl font-semibold mb-3 text-center">
            Message Owner
          </h2>

          <p className="text-sm text-gray-500 text-center mb-3">
            Have questions? Send a message to the owner
          </p>

          <textarea
            placeholder="Write your message..."
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
          />

          <button
            onClick={handleSendMessage}
            className="w-full mt-3 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Send Message
          </button>

        </div>
      )}

    </div>

  )

}