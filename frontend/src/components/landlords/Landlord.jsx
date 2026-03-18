import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function Landlord(){

const [pgs,setPgs] = useState([])
const [rooms,setRooms] = useState([])
const [bookings,setBookings] = useState([])
const [loading,setLoading] = useState(true)

const user = JSON.parse(localStorage.getItem("user"))

// BASE URL (change if needed)
const BASE_URL = "http://localhost:3000"

// FETCH ALL DATA
const fetchData = async()=>{
    try{

        const [pgRes,roomRes,bookingRes] = await Promise.all([

            axios.get(`${BASE_URL}/pgs/landlord/${user.id}`),
            axios.get(`${BASE_URL}/rooms/landlord/${user.id}`),
            axios.get(`${BASE_URL}/bookings/landlord/${user.id}`)

        ])

        setPgs(pgRes.data.data || [])
        setRooms(roomRes.data.data || [])
        setBookings(bookingRes.data.data || [])

    }catch(err){
        console.log(err)
        toast.error("Failed to load landlord data")
    }finally{
        setLoading(false)
    }
}

useEffect(()=>{
    if(user){
        fetchData()
    }
},[])

if(!user){
    return <h2 className="text-center mt-20 text-xl">Please login first</h2>
}

if(loading){
    return <h2 className="text-center mt-20 text-xl">Loading Dashboard...</h2>
}

return(

<div className="pt-24 px-6 bg-gray-100 min-h-screen">

<h1 className="text-4xl font-bold mb-8 text-indigo-700">
🏠 Landlord Dashboard
</h1>

{/* 🔥 STATS */}
<div className="grid md:grid-cols-3 gap-6 mb-10">

<div className="bg-white p-6 rounded-xl shadow">
<h2 className="text-lg text-gray-600">Total PGs</h2>
<p className="text-3xl font-bold text-indigo-600">{pgs.length}</p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<h2 className="text-lg text-gray-600">Total Rooms</h2>
<p className="text-3xl font-bold text-green-600">{rooms.length}</p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<h2 className="text-lg text-gray-600">Total Bookings</h2>
<p className="text-3xl font-bold text-orange-600">{bookings.length}</p>
</div>

</div>

{/* 🔥 PG LIST */}
<div className="mb-10">
<h2 className="text-2xl font-bold mb-4">Your PGs</h2>

<div className="grid md:grid-cols-3 gap-6">

{pgs.length === 0 && <p>No PGs found</p>}

{pgs.map(pg=>(
<div key={pg._id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">

<h3 className="text-xl font-semibold text-indigo-700">
{pg.pgName}
</h3>

<p className="text-gray-600 mt-2">
{pg.description}
</p>

<p className="text-sm text-gray-500 mt-2">
Type: {pg.pgType}
</p>

<p className="text-sm text-gray-500">
Status: {pg.availabilityStatus}
</p>

</div>
))}

</div>
</div>

{/* 🔥 ROOM LIST */}
<div className="mb-10">
<h2 className="text-2xl font-bold mb-4">Your Rooms</h2>

<div className="grid md:grid-cols-3 gap-6">

{rooms.length === 0 && <p>No Rooms found</p>}

{rooms.map(room=>(
<div key={room._id} className="bg-white p-5 rounded-xl shadow">

<h3 className="text-lg font-semibold">
{room.roomType}
</h3>

<p className="text-gray-600">
PG: {room.pgId?.pgName}
</p>

<p className="text-gray-600">
Beds: {room.availableBeds}/{room.totalBeds}
</p>

<p className="text-gray-600">
Rent: ₹ {room.monthlyRent}
</p>

</div>
))}

</div>
</div>

{/* 🔥 BOOKINGS LIST */}
<div>
<h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>

<div className="bg-white rounded-xl shadow overflow-x-auto">

<table className="w-full">

<thead className="bg-indigo-600 text-white">
<tr>
<th className="p-3 text-left">User</th>
<th className="p-3 text-left">PG</th>
<th className="p-3 text-left">Room</th>
<th className="p-3 text-left">Status</th>
</tr>
</thead>

<tbody>

{bookings.length === 0 && (
<tr>
<td colSpan="4" className="text-center p-4">
No bookings found
</td>
</tr>
)}

{bookings.map(b=>(
<tr key={b._id} className="border-b">

<td className="p-3">
{b.userId?.firstName} {b.userId?.lastName}
</td>

<td className="p-3">
{b.pgId?.pgName}
</td>

<td className="p-3">
{b.roomId?.roomType}
</td>

<td className="p-3">
<span className={`px-3 py-1 rounded-full text-sm ${
b.status === "confirmed"
? "bg-green-100 text-green-600"
: "bg-yellow-100 text-yellow-600"
}`}>
{b.status}
</span>
</td>

</tr>
))}

</tbody>

</table>

</div>
</div>

</div>

)
}