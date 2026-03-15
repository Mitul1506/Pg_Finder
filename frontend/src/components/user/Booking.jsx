import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function Booking(){

const { roomId } = useParams()
const navigate = useNavigate()

const [room,setRoom] = useState(null)


// GET ROOM DETAILS
const getRoom = async()=>{

try{

const res = await axios.get(`http://localhost:3000/rooms/${roomId}`)

setRoom(res.data.data)

}catch(err){

toast.error("Failed to load room")

}

}

useEffect(()=>{
getRoom()
},[])


// CONFIRM BOOKING
const confirmBooking = async()=>{

try{

const user = JSON.parse(localStorage.getItem("user"))

if(!user){
toast.error("Please login first")
navigate("/login")
return
}

await axios.post("http://localhost:3000/bookings",{
roomId: room._id,
tenantId: user._id
})

toast.success("Room booked successfully")

navigate("/mybookings")

}catch(err){

toast.error(err.response?.data?.message || "Booking failed")

}

}


// ⭐ IMPORTANT SAFE CHECK
if(!room){

return(
<div className="pt-24 text-center text-lg">
Loading room details...
</div>
)

}


return(

<div className="pt-24 px-10 bg-gray-100 min-h-screen">

<h1 className="text-3xl font-bold text-center mb-10">
Confirm Your Booking
</h1>

<div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">

<img
src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
alt="room"
className="h-48 w-full object-cover rounded"
/>

<div className="mt-4">

<h2 className="text-xl font-semibold">
{room.roomType} Room
</h2>

<p className="text-gray-600 mt-2">
Total Beds: {room.totalBeds}
</p>

<p className="text-gray-600">
Available Beds: {room.availableBeds}
</p>

<p className="text-indigo-600 font-bold text-lg mt-2">
₹ {room.monthlyRent} / month
</p>

<p className="text-gray-600">
Deposit: ₹ {room.deposit}
</p>

</div>

<button
onClick={confirmBooking}
className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
>
Confirm Booking
</button>

</div>

</div>

)

}