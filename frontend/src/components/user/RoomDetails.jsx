import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ReviewSection from "/src/components/user/ReviewSection"   // ✅ ADD THIS

export default function RoomDetails(){

const { id } = useParams()
const navigate = useNavigate()

const [room,setRoom] = useState(null)
const [loading,setLoading] = useState(false)

// ================= GET ROOM =================
const getRoom = async()=>{

try{

const res = await axios.get(`http://localhost:3000/rooms/${id}`)
setRoom(res.data.data)

}catch(err){

toast.error("Failed to load room")

}

}

useEffect(()=>{
getRoom()
},[])


// ================= BOOK ROOM =================
const bookRoom = async()=>{

const user = JSON.parse(localStorage.getItem("user"))

if(!user){
toast.error("Please login first")
navigate("/login")
return
}

// ❌ prevent booking if full
if(room.availableBeds <= 0){
toast.error("Room is already full")
return
}

try{

setLoading(true)

await axios.post("http://localhost:3000/bookings",{

userId:user._id || user.id,
roomId:room._id,
pgId:room.pgId?._id || room.pgId   // ✅ FIXED

})

toast.success("Room booked successfully ✅")

// update UI instantly
setRoom(prev=>({
...prev,
availableBeds: prev.availableBeds - 1
}))

// redirect
setTimeout(()=>{
navigate("/mybookings")
},1000)

}catch(err){

console.log("Booking Error:",err.response?.data)

toast.error(err.response?.data?.message || "Booking failed")

}finally{
setLoading(false)
}

}


// ================= UI =================
if(!room) return <h2 className="text-center mt-20 text-xl font-semibold">Loading Room...</h2>

return(

<div className="pt-24 px-8 bg-gray-100 min-h-screen">

<h1 className="text-4xl font-bold mb-8">
Room Details
</h1>

<div className="grid md:grid-cols-3 gap-8">

{/* LEFT */}
<div className="md:col-span-2 space-y-6">

<div className="bg-white rounded-xl shadow overflow-hidden">
<img
src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
alt="room"
className="w-full h-80 object-cover"
/>
</div>

<div className="bg-white p-8 rounded-xl shadow">

<h2 className="text-2xl font-bold mb-4">
{room.roomType}
</h2>

<div className="grid grid-cols-2 gap-4 text-gray-700">

<p><b>Total Beds:</b> {room.totalBeds}</p>
<p><b>Available Beds:</b> {room.availableBeds}</p>
<p><b>Monthly Rent:</b> ₹ {room.monthlyRent}</p>
<p><b>Security Deposit:</b> ₹ {room.deposit}</p>

</div>

</div>

<div className="bg-white p-8 rounded-xl shadow">

<h3 className="text-xl font-semibold mb-4">
Room Amenities
</h3>

<div className="grid grid-cols-2 gap-3">

{room.roomAmenities?.map((a,i)=>(
<div key={i} className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
{a}
</div>
))}

</div>

</div>

{/* ✅ REVIEW SECTION ADDED HERE */}
<div className="bg-white p-8 rounded-xl shadow">
<ReviewSection pgId={room.pgId?._id || room.pgId} />
</div>

</div>

{/* RIGHT */}
<div className="bg-white p-6 rounded-xl shadow h-fit">

<h3 className="text-xl font-bold mb-4">
Booking Summary
</h3>

<p className="text-gray-600 mb-2">
Room Type: <b>{room.roomType}</b>
</p>

<p className="text-gray-600 mb-2">
Rent: <b>₹ {room.monthlyRent}</b>
</p>

<p className="text-gray-600 mb-6">
Deposit: <b>₹ {room.deposit}</b>
</p>

{/* STATUS */}
{room.availableBeds === 0 && (
<p className="text-red-600 font-semibold mb-3">
Room Full ❌
</p>
)}

<button
onClick={bookRoom}
disabled={loading || room.availableBeds === 0}
className={`w-full py-3 rounded-lg font-semibold transition ${
room.availableBeds === 0
? "bg-gray-400 cursor-not-allowed"
: "bg-indigo-600 hover:bg-indigo-700 text-white"
}`}
>

{loading ? "Booking..." : "Book This Room"}

</button>

</div>

</div>

</div>

)

}