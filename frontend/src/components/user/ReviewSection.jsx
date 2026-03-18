import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function ReviewSection({ pgId }) {

const [reviews, setReviews] = useState([])
const [rating, setRating] = useState(5)
const [comment, setComment] = useState("")
const [avgRating, setAvgRating] = useState(0)

const user = JSON.parse(localStorage.getItem("user"))

// ================== FETCH REVIEWS ==================
const getReviews = async () => {
    try {

        const res = await axios.get(`http://localhost:3000/reviews/pg/${pgId}`)
        setReviews(res.data.data)

    } catch (err) {
        console.log(err)
    }
}

// ================== FETCH AVG ==================
const getAvgRating = async () => {
    try {

        const res = await axios.get(`http://localhost:3000/reviews/avg/${pgId}`)
        setAvgRating(res.data.averageRating)

    } catch (err) {
        console.log(err)
    }
}

// ================== SUBMIT REVIEW ==================
const submitReview = async () => {

    if (!comment) {
        return toast.error("Please write comment")
    }

    try {

        await axios.post("http://localhost:3000/reviews", {
            userId: user._id || user.id,
            pgId,
            rating,
            comment
        })

        toast.success("Review added")

        setComment("")
        setRating(5)

        getReviews()
        getAvgRating()

    } catch (err) {
        toast.error(err.response?.data?.message || "Error")
    }
}

useEffect(() => {
    getReviews()
    getAvgRating()
}, [pgId])

// ================== UI ==================
return (

<div className="mt-16">

{/* TITLE */}
<h2 className="text-2xl font-bold mb-4">
Reviews & Ratings ⭐
</h2>

{/* AVG RATING */}
<p className="mb-4 text-lg font-semibold">
Average Rating: {avgRating.toFixed(1)} ⭐
</p>

{/* ADD REVIEW */}
<div className="bg-white p-5 rounded shadow mb-8">

<h3 className="text-xl font-semibold mb-3">
Add Review
</h3>

{/* RATING */}
<select
value={rating}
onChange={(e)=>setRating(e.target.value)}
className="border p-2 mb-3 w-full"
>
<option value={5}>5 ⭐</option>
<option value={4}>4 ⭐</option>
<option value={3}>3 ⭐</option>
<option value={2}>2 ⭐</option>
<option value={1}>1 ⭐</option>
</select>

{/* COMMENT */}
<textarea
placeholder="Write your review..."
value={comment}
onChange={(e)=>setComment(e.target.value)}
className="border p-2 w-full mb-3"
/>

<button
onClick={submitReview}
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Submit Review
</button>

</div>

{/* REVIEW LIST */}
<div className="space-y-4">

{reviews.length === 0 ? (
<p>No reviews yet</p>
) : (
reviews.map((r)=>(
<div key={r._id} className="bg-gray-100 p-4 rounded">

<p className="font-semibold">
{r.userId?.firstName} {r.userId?.lastName}
</p>

<p className="text-yellow-500">
{"⭐".repeat(r.rating)}
</p>

<p className="text-gray-700">
{r.comment}
</p>

</div>
))
)}

</div>

</div>

)

}