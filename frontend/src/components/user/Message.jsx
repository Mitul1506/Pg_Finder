import React,{useEffect,useState} from "react"
import axios from "axios"
import {toast} from "react-toastify"

export default function Message(){

const [messages,setMessages] = useState([])
const [text,setText] = useState("")

const getMessages = async()=>{

const res = await axios.get("http://localhost:3000/messages")

setMessages(res.data.data)

}

useEffect(()=>{
getMessages()
},[])

const sendMessage = async(e)=>{

e.preventDefault()

await axios.post("http://localhost:3000/messages",{
text
})

toast.success("Message sent")

setText("")

getMessages()

}

const deleteMessage = async(id)=>{

await axios.delete(`http://localhost:3000/messages/${id}`)

toast.success("Deleted")

getMessages()

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">Messages</h1>

<form onSubmit={sendMessage} className="flex gap-4 mb-6">

<input
placeholder="Write message..."
value={text}
onChange={(e)=>setText(e.target.value)}
className="border p-2 rounded w-96"
/>

<button className="bg-indigo-600 text-white px-4 py-2 rounded">
Send
</button>

</form>

{messages.map((msg)=>(

<div key={msg._id} className="border p-4 mb-3 rounded">

<p>{msg.text}</p>

<button
onClick={()=>deleteMessage(msg._id)}
className="bg-red-500 text-white px-3 py-1 rounded mt-2"
>
Delete
</button>

</div>

))}

</div>

)

}