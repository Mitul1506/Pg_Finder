import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function Reviews() {

  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState("")
  const [comment, setComment] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))

  // Fetch reviews
  const getReviews = async () => {

    try {

      const res = await axios.get("http://localhost:3000/reviews")

      setReviews(res.data.data)

    } catch (error) {

      console.log(error)
      toast.error("Failed to load reviews")

    }

  }

  useEffect(() => {
    getReviews()
  }, [])

  // Add review
  const submitReview = async (e) => {

    e.preventDefault()

    if (!user) {
      toast.error("Please login first")
      return
    }

    try {

      await axios.post("http://localhost:3000/reviews", {

        userId: user._id,
        rating: rating,
        comment: comment

      })

      toast.success("Review added successfully")

      setRating("")
      setComment("")

      getReviews()

    } catch (error) {

      toast.error("Failed to add review")

    }

  }

  return (

    <div className="bg-gray-100 min-h-screen p-10">

      <h1 className="text-3xl font-bold text-center mb-8">
        PG Reviews
      </h1>

      {/* Add Review Form */}

      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md mb-10">

        <h2 className="text-xl font-semibold mb-4">
          Write a Review
        </h2>

        <form onSubmit={submitReview}>

          <label className="block mb-2">
            Rating (1-5)
          </label>

          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e)=>setRating(e.target.value)}
            className="border w-full p-2 rounded mb-4"
            required
          />

          <label className="block mb-2">
            Comment
          </label>

          <textarea
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            className="border w-full p-2 rounded mb-4"
            rows="4"
            required
          />

          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Submit Review
          </button>

        </form>

      </div>

      {/* Review List */}

      <div className="grid md:grid-cols-3 gap-6">

        {reviews.map((review) => (

          <div
            key={review._id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
          >

            <h3 className="text-lg font-semibold mb-2">
              Rating: ⭐ {review.rating}/5
            </h3>

            <p className="text-gray-700 mb-3">
              {review.comment}
            </p>

            <p className="text-sm text-gray-500">
              User: {review.userId?.firstName || "Anonymous"}
            </p>

          </div>

        ))}

      </div>

    </div>

  )

}