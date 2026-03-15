import React,{useEffect,useState} from "react"
import axios from "axios"
import {toast} from "react-toastify"

export default function Reviews(){

const [reviews,setReviews] = useState([])
const [comment,setComment] = useState("")
const [rating,setRating] = useState("")

const getReviews = async()=>{

const res = await axios.get("http://localhost:3000/reviews")

setReviews(res.data.data)

}

useEffect(()=>{
getReviews()
},[])

const addReview = async(e)=>{

e.preventDefault()

try{

await axios.post("http://localhost:3000/reviews",{
comment,
rating
})

toast.success("Review added")

setComment("")
setRating("")

getReviews()

}catch(err){

toast.error("Error")

}

}

const deleteReview = async(id)=>{

await axios.delete(`http://localhost:3000/reviews/${id}`)

toast.success("Review deleted")

getReviews()

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">Reviews</h1>

<form onSubmit={addReview} className="flex gap-4 mb-6">

<input
placeholder="Comment"
value={comment}
onChange={(e)=>setComment(e.target.value)}
className="border p-2 rounded"
/>

<input
placeholder="Rating"
value={rating}
onChange={(e)=>setRating(e.target.value)}
className="border p-2 rounded"
/>

<button className="bg-indigo-600 text-white px-4 py-2 rounded">
Add
</button>

</form>

{reviews.map((review)=>(

<div key={review._id} className="border p-4 rounded mb-3">

<p>{review.comment}</p>
<p>⭐ {review.rating}</p>

<button
onClick={()=>deleteReview(review._id)}
className="bg-red-500 text-white px-3 py-1 rounded mt-2"
>
Delete
</button>

</div>

))}

</div>

)

}