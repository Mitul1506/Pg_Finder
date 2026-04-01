import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function MyBookings(){

const [bookings,setBookings] = useState([])
const [loading,setLoading] = useState(true)


const [disputes,setDisputes] = useState({})

const [showModal,setShowModal] = useState(false)
const [selectedBooking,setSelectedBooking] = useState(null)
const [issueType,setIssueType] = useState("")
const [description,setDescription] = useState("")

const user = JSON.parse(localStorage.getItem("user"))

// ================= GET BOOKINGS =================
const getBookings = async()=>{
try{
const userId = user._id || user.id
const res = await axios.get(`http://localhost:3000/bookings/user/${userId}`)

setBookings(res.data.data)


const disputesData = {}

for(let b of res.data.data){
    const d = await axios.get(`http://localhost:3000/disputes/booking/${b._id}`)
    disputesData[b._id] = d.data.data
}

setDisputes(disputesData)

}catch(err){
toast.error("Failed to load bookings")
}finally{
setLoading(false)
}
}


const cancelBooking = async(id)=>{
try{
await axios.put(`http://localhost:3000/bookings/cancel/${id}`)
toast.success("Booking cancelled")
getBookings()
}catch(err){
toast.error("Cancel failed")
}
}


const openDisputeModal = (booking)=>{
setSelectedBooking(booking)
setShowModal(true)
}


const submitDispute = async()=>{
try{

if(!issueType || !description){
toast.error("Fill all fields")
return
}

await axios.post("http://localhost:3000/disputes",{
bookingId: selectedBooking._id,
raisedBy: user._id || user.id,
againstUserId: selectedBooking.pgId?.landlordId,
issueType,
description
})

toast.success("Dispute raised")

setShowModal(false)
setIssueType("")
setDescription("")

getBookings() 

}catch(err){
toast.error("Failed to raise dispute")
}
}

useEffect(()=>{
getBookings()
},[])

// ================= UI =================
if(loading){
return <h2 className="text-center mt-20 text-xl">Loading bookings...</h2>
}

return(

<div className="pt-24 px-10 bg-gray-100 min-h-screen">

<h1 className="text-3xl font-bold text-center mb-10">
My Bookings
</h1>

<div className="grid md:grid-cols-3 gap-8">

{bookings.map((b)=>{

const dispute = disputes[b._id]

return(

<div key={b._id} className="bg-white p-5 rounded-xl shadow">

<h2 className="text-xl font-bold mb-2">
Room: {b.roomId?.roomType}
</h2>

<p>PG: {b.pgId?.pgName}</p>
<p>Rent: ₹ {b.roomId?.monthlyRent}</p>

<p>
Status:
<span className="ml-2 font-semibold text-green-600">
{b.status}
</span>
</p>

<p className="mb-3">
Payment:
<span className={`ml-2 font-semibold ${
b.paymentStatus === "paid"
? "text-green-600"
: b.paymentStatus === "failed"
? "text-red-500"
: "text-yellow-500"
}`}>
{b.paymentStatus}
</span>
</p>

{/* CANCEL */}
{b.status !== "cancelled" && (
<button
onClick={()=>cancelBooking(b._id)}
className="w-full bg-red-500 text-white py-2 rounded mb-2"
>
Cancel Booking
</button>
)}



{!dispute ? (

<button
onClick={()=>openDisputeModal(b)}
className="w-full bg-yellow-500 text-white py-2 rounded"
>
Raise Dispute ⚠️
</button>

) : (

<div className="mt-3 p-3 border rounded bg-gray-50">

<p className="text-sm">
<b>Issue:</b> {dispute.issueType}
</p>

<p className="text-sm">
<b>Status:</b>{" "}
<span className={`font-semibold ${
dispute.status === "resolved"
? "text-green-600"
: dispute.status === "rejected"
? "text-red-500"
: "text-yellow-500"
}`}>
{dispute.status}
</span>
</p>

{dispute.adminRemarks && (
<p className="text-sm">
<b>Admin:</b> {dispute.adminRemarks}
</p>
)}

</div>

)}

</div>

)

})}

</div>

{/* ================= MODAL ================= */}
{showModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

<div className="bg-white p-6 rounded w-[400px]">

<h2 className="text-xl font-bold mb-4 text-red-600">
Raise Dispute
</h2>

<select
value={issueType}
onChange={(e)=>setIssueType(e.target.value)}
className="w-full p-2 border mb-3"
>
<option value="">Select Issue</option>
<option value="Room Issue">Room Issue</option>
<option value="Payment Issue">Payment Issue</option>
<option value="Owner Misbehavior">Owner Misbehavior</option>
</select>

<textarea
placeholder="Describe issue"
value={description}
onChange={(e)=>setDescription(e.target.value)}
className="w-full p-2 border mb-3"
/>

<div className="flex justify-between">

<button onClick={()=>setShowModal(false)} className="bg-gray-400 text-white px-4 py-1 rounded">
Cancel
</button>

<button onClick={submitDispute} className="bg-red-500 text-white px-4 py-1 rounded">
Submit
</button>

</div>

</div>
</div>
)}

</div>
)
}