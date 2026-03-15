import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function RoomDetails(){

const { id } = useParams()

const [room,setRoom] = useState(null)

const getRoom = async()=>{

const res = await axios.get(`http://localhost:3000/rooms/${id}`)

setRoom(res.data.data)

}

useEffect(()=>{
getRoom()
},[])

if(!room) return <h2 className="text-center mt-20 text-xl font-semibold">Loading Room...</h2>

return(

<div className="pt-24 px-8 bg-gray-100 min-h-screen">

{/* Page Title */}

<h1 className="text-4xl font-bold mb-8">
Room Details
</h1>


{/* Main Layout */}

<div className="grid md:grid-cols-3 gap-8">

{/* LEFT SECTION */}

<div className="md:col-span-2 space-y-6">


{/* Room Image */}

<div className="bg-white rounded-xl shadow overflow-hidden">

<img
src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
alt="room"
className="w-full h-80 object-cover"
/>

</div>


{/* Room Information */}

<div className="bg-white p-8 rounded-xl shadow">

<h2 className="text-2xl font-bold mb-4">
{room.roomType}
</h2>

<div className="grid grid-cols-2 gap-4 text-gray-700">

<p>
<span className="font-semibold">Total Beds:</span> {room.totalBeds}
</p>

<p>
<span className="font-semibold">Available Beds:</span> {room.availableBeds}
</p>

<p>
<span className="font-semibold">Monthly Rent:</span> ₹ {room.monthlyRent}
</p>

<p>
<span className="font-semibold">Security Deposit:</span> ₹ {room.deposit}
</p>

</div>

</div>


{/* Amenities */}

<div className="bg-white p-8 rounded-xl shadow">

<h3 className="text-xl font-semibold mb-4">
Room Amenities
</h3>

<div className="grid grid-cols-2 gap-3">

{room.roomAmenities?.map((a,i)=>(
<div
key={i}
className="bg-gray-100 px-4 py-2 rounded-lg text-sm"
>
{a}
</div>
))}

</div>

</div>


</div>



{/* RIGHT SECTION (Booking Card) */}

<div className="bg-white p-6 rounded-xl shadow h-fit">

<h3 className="text-xl font-bold mb-4">
Booking Summary
</h3>

<p className="text-gray-600 mb-2">
Room Type: <span className="font-semibold">{room.roomType}</span>
</p>

<p className="text-gray-600 mb-2">
Rent: <span className="font-semibold">₹ {room.monthlyRent}</span>
</p>

<p className="text-gray-600 mb-6">
Deposit: <span className="font-semibold">₹ {room.deposit}</span>
</p>

<button
className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
>
Book This Room
</button>

</div>


</div>

</div>

)

}