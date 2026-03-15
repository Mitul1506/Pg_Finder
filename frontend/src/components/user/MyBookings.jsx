import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function MyBookings(){

const [bookings,setBookings] = useState([])
const [loading,setLoading] = useState(true)

const navigate = useNavigate()

const user = JSON.parse(localStorage.getItem("user"))


// CHECK LOGIN
useEffect(()=>{

if(!user){
toast.error("Please login first")
navigate("/login")
return
}

getBookings()

},[])


// GET USER BOOKINGS FROM DATABASE
const getBookings = async()=>{

try{

const res = await axios.get(`http://localhost:3000/bookings/user/${user._id}`)

setBookings(res.data?.data || [])

}catch(err){

toast.error("Failed to load bookings")

}finally{

setLoading(false)

}

}



// CANCEL BOOKING
const cancelBooking = async(id)=>{

try{

await axios.delete(`http://localhost:3000/bookings/${id}`)

toast.success("Booking cancelled successfully")

// reload bookings
getBookings()

}catch(err){

toast.error("Cancel failed")

}

}



// LOADING UI
if(loading){

return(

<div className="pt-24 text-center text-lg">
Loading bookings...
</div>

)

}



return(

<div className="pt-24 px-10 bg-gray-100 min-h-screen">

<h1 className="text-3xl font-bold text-center mb-10">
My Bookings
</h1>


{/* NO BOOKINGS */}

{bookings.length === 0 ? (

<div className="text-center text-gray-500 text-lg">
You have no bookings yet.
</div>

) : (

<div className="grid md:grid-cols-2 gap-8">

{bookings.map((booking)=>{

const room = booking.roomId
const pg = booking.pgId

return(

<div
key={booking._id}
className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
>

{/* ROOM IMAGE */}

<img
src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
alt="room"
className="w-full h-48 object-cover"
/>


<div className="p-5">

{/* PG NAME */}

<h2 className="text-lg font-bold text-indigo-600">
{pg?.pgName || "PG"}
</h2>


{/* ROOM TYPE */}

<h3 className="text-xl font-semibold mt-1">
{room?.roomType} Room
</h3>


<p className="text-gray-600 mt-2">
Monthly Rent: ₹{room?.monthlyRent}
</p>

<p className="text-gray-600">
Deposit: ₹{room?.deposit}
</p>

<p className="text-gray-600">
Total Beds: {room?.totalBeds}
</p>


{/* BOOKING DATE */}

<p className="text-gray-500 mt-2 text-sm">
Booked On: {new Date(booking.bookingDate).toLocaleDateString()}
</p>


{/* STATUS */}

<p className="mt-2 font-semibold text-green-600">
Status: {booking.status}
</p>


<div className="flex gap-3 mt-4">

<button
onClick={()=>navigate(`/room/${room?._id}`)}
className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black"
>
View Room
</button>

<button
onClick={()=>cancelBooking(booking._id)}
className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
>
Cancel Booking
</button>

</div>

</div>

</div>

)

})}

</div>

)}

</div>

)

}