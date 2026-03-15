import React, {useEffect,useState} from "react"
import axios from "axios"
import {useParams,useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

export default function BookRoom(){

const {id} = useParams()
const navigate = useNavigate()

const [room,setRoom] = useState(null)

const user = JSON.parse(localStorage.getItem("user"))

const getRoom = async()=>{

try{

const res = await axios.get(`http://localhost:3000/rooms/${id}`)
setRoom(res.data.data)

}catch(err){

toast.error("Room load failed")

}

}

useEffect(()=>{
getRoom()
},[])


const confirmBooking = async()=>{

try{

await axios.post("http://localhost:3000/bookings",{

roomId:id,
tenantId:user._id

})

toast.success("Booking Successful")

navigate("/bookings")

}catch(err){

toast.error("Booking failed")

}

}

if(!room){
return <div className="p-10">Loading...</div>
}

return(

<div className="pt-24 px-10 bg-gray-100 min-h-screen flex justify-center">

<div className="bg-white shadow-lg rounded-xl p-8 w-96">

<h2 className="text-2xl font-bold mb-4 text-center">
Confirm Booking
</h2>

<p className="mb-2"><b>Room:</b> {room.roomType}</p>

<p className="mb-2"><b>Rent:</b> ₹{room.monthlyRent}</p>

<p className="mb-2"><b>Deposit:</b> ₹{room.deposit}</p>

<p className="mb-6 text-green-600 font-semibold">
Total Payable: ₹{room.monthlyRent + room.deposit}
</p>

<button
onClick={confirmBooking}
className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
>
Confirm Booking
</button>

</div>

</div>

)

}