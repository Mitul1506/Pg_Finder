import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function MyBookings(){

const [bookings,setBookings] = useState([])
const [loading,setLoading] = useState(true)

const user = JSON.parse(localStorage.getItem("user"))

// GET BOOKINGS
const getBookings = async()=>{

try{

const userId = user._id || user.id

const res = await axios.get(`http://localhost:3000/bookings/user/${userId}`)

setBookings(res.data.data)

}catch(err){

toast.error("Failed to load bookings")

}finally{
setLoading(false)
}

}

// CANCEL BOOKING
const cancelBooking = async(id)=>{

try{

await axios.put(`http://localhost:3000/bookings/cancel/${id}`)

toast.success("Booking cancelled")

getBookings()

}catch(err){

toast.error(err.response?.data?.message || "Cancel failed")

}

}

useEffect(()=>{
getBookings()
},[])


// LOADING
if(loading){
return <h2 className="text-center mt-20 text-xl">Loading bookings...</h2>
}

return(

<div className="pt-24 px-10 bg-gray-100 min-h-screen">

<h1 className="text-3xl font-bold text-center mb-10">
My Bookings
</h1>

{bookings.length === 0 ? (

<p className="text-center text-gray-600">
No bookings yet
</p>

) : (

<div className="grid md:grid-cols-3 gap-8">

{bookings.map((b)=>(
<div key={b._id} className="bg-white p-5 rounded-xl shadow">

<h2 className="text-xl font-bold mb-2">
Room: {b.roomId?.roomType}
</h2>

<p className="text-gray-600">
PG: {b.pgId?.pgName}
</p>

<p className="text-gray-600">
Rent: ₹ {b.roomId?.monthlyRent}
</p>

<p className="text-gray-600">
Status: 
<span className={`ml-2 font-semibold ${
b.status === "cancelled" ? "text-red-500" : "text-green-600"
}`}>
{b.status}
</span>
</p>

<p className="text-gray-600 mb-4">
Payment: {b.paymentStatus}
</p>

{/* CANCEL BUTTON */}
{b.status !== "cancelled" && (
<button
onClick={()=>cancelBooking(b._id)}
className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
>
Cancel Booking
</button>
)}

</div>
))}

</div>

)}

</div>

)

}