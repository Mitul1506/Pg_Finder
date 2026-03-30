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
            rating: Number(rating), 
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

// ⭐ Render stars
const renderStars = (count) => {
    return "⭐".repeat(count)
}

// 👤 initials
const getInitials = (u) => {
    const f = u?.firstName?.charAt(0)?.toUpperCase() || ""
    const l = u?.lastName?.charAt(0)?.toUpperCase() || ""
    return f + l
}

// ================== UI ==================
return (

<div className="mt-16 max-w-4xl mx-auto">

{/* HEADER */}
<div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold">
        Reviews & Ratings
    </h2>

    <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
        ⭐ {avgRating.toFixed(1)}
    </div>
</div>

{/* ADD REVIEW */}
<div className="bg-white p-6 rounded-2xl shadow-md mb-8">

<h3 className="text-lg font-semibold mb-4">
Add Your Review
</h3>

{/* ⭐ CLICKABLE STARS */}
<div className="flex gap-2 mb-4 text-2xl cursor-pointer">
    {[1,2,3,4,5].map((star)=>(
        <span
            key={star}
            onClick={()=>setRating(star)}
            className={`transition ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
            } hover:scale-110`}
        >
            ★
        </span>
    ))}
</div>

{/* COMMENT */}
<textarea
placeholder="Share your experience..."
value={comment}
onChange={(e)=>setComment(e.target.value)}
className="border rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
/>

<button
onClick={submitReview}
className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
>
Submit Review
</button>

</div>

{/* REVIEWS LIST */}
<div className="space-y-4">

{reviews.length === 0 ? (
    <div className="text-center text-gray-500 py-10">
        No reviews yet 😔
    </div>
) : (
reviews.map((r)=>(
<div key={r._id} className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">

    <div className="flex items-center gap-3 mb-2">

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
            {getInitials(r.userId)}
        </div>

        <div>
            <p className="font-semibold text-gray-800">
                {r.userId?.firstName} {r.userId?.lastName}
            </p>

            <p className="text-yellow-400 text-sm">
                {renderStars(r.rating)}
            </p>
        </div>
    </div>

    <p className="text-gray-600 mt-2">
        {r.comment}
    </p>

</div>
))
)}

</div>

</div>

)

}