import React,{useEffect,useState} from "react"
import axios from "axios"
import {toast} from "react-toastify"

export default function Notification(){

const [notifications,setNotifications] = useState([])
const [message,setMessage] = useState("")

const getNotifications = async()=>{

const res = await axios.get("http://localhost:3000/notifications")

setNotifications(res.data.data)

}

useEffect(()=>{
getNotifications()
},[])

const addNotification = async(e)=>{

e.preventDefault()

await axios.post("http://localhost:3000/notifications",{
message
})

toast.success("Notification added")

setMessage("")

getNotifications()

}

const deleteNotification = async(id)=>{

await axios.delete(`http://localhost:3000/notifications/${id}`)

toast.success("Deleted")

getNotifications()

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">Notifications</h1>

<form onSubmit={addNotification} className="flex gap-4 mb-6">

<input
placeholder="Message"
value={message}
onChange={(e)=>setMessage(e.target.value)}
className="border p-2 rounded"
/>

<button className="bg-indigo-600 text-white px-4 py-2 rounded">
Send
</button>

</form>

{notifications.map((n)=>(

<div key={n._id} className="border p-4 mb-3 rounded">

<p>{n.message}</p>

<button
onClick={()=>deleteNotification(n._id)}
className="bg-red-500 text-white px-3 py-1 rounded mt-2"
>
Delete
</button>

</div>

))}

</div>

)

}