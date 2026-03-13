import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function Notification() {

  const [notifications, setNotifications] = useState([])

  const user = JSON.parse(localStorage.getItem("user"))

  // Fetch notifications
  const getNotifications = async () => {

    if (!user) return

    try {

      const res = await axios.get(`http://localhost:3000/notifications?userId=${user._id}`)

      setNotifications(res.data.data)

    } catch (error) {

      console.log(error)
      toast.error("Failed to load notifications")

    }

  }

  useEffect(() => {

    getNotifications()

  }, [])

  // Mark as read
  const markAsRead = async (id) => {

    try {

      await axios.put(`http://localhost:3000/notifications/${id}`)

      toast.success("Notification marked as read")

      getNotifications()

    } catch (error) {

      toast.error("Failed to update notification")

    }

  }

  return (

    <div className="bg-gray-100 min-h-screen p-10">

      <h1 className="text-3xl font-bold text-center mb-8">
        Notifications
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">

        {notifications.length === 0 ? (

          <p className="text-center text-gray-500">
            No notifications found
          </p>

        ) : (

          notifications.map((n) => (

            <div
              key={n._id}
              className={`p-5 rounded-xl shadow-md flex justify-between items-center
              ${n.isRead ? "bg-white" : "bg-indigo-50 border-l-4 border-indigo-600"}`}
            >

              <div>

                <h3 className="text-lg font-semibold">
                  {n.title}
                </h3>

                <p className="text-gray-600">
                  {n.message}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>

              </div>

              {!n.isRead && (

                <button
                  onClick={()=>markAsRead(n._id)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Mark Read
                </button>

              )}

            </div>

          ))

        )}

      </div>

    </div>

  )

}