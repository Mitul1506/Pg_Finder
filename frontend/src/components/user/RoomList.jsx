import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function RoomList(){

const [rooms,setRooms] = useState([])
const { pgId } = useParams()
const navigate = useNavigate()

// GET ROOMS OF PARTICULAR PG
const getRooms = async()=>{

try{

const res = await axios.get(`http://localhost:3000/rooms/pg/${pgId}`)

setRooms(res.data.data)

}catch(err){

toast.error("Failed to load rooms")

}

}

useEffect(()=>{
getRooms()
},[])

return(

<div className="pt-24 px-10 bg-gray-100 min-h-screen">

<h1 className="text-3xl font-bold text-center mb-10">
Available Rooms
</h1>

<div className="grid md:grid-cols-3 gap-8">

{rooms.map((room)=>(

<div
key={room._id}
className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
>

{/* ROOM IMAGE */}
<img
src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
alt="room"
className="h-48 w-full object-cover"
/>

<div className="p-5">

{/* ROOM TYPE */}
<h2 className="text-xl font-semibold mb-2">
{room.roomType} Room
</h2>

{/* BEDS */}
<p className="text-gray-600">
Total Beds: {room.totalBeds}
</p>

<p className="text-gray-600">
Available Beds: {room.availableBeds}
</p>

{/* RENT */}
<p className="text-indigo-600 font-bold text-lg mt-2">
₹ {room.monthlyRent} / month
</p>

{/* DEPOSIT */}
<p className="text-gray-600 mb-2">
Deposit: ₹ {room.deposit}
</p>

{/* AMENITIES */}
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

{/* BUTTON */}
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

</div>

)

}