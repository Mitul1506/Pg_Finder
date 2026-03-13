import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function Message() {

  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))

  // Fetch messages
  const getMessages = async () => {

    try {

      const res = await axios.get("http://localhost:3000/messages")

      setMessages(res.data.data)

    } catch (error) {

      console.log(error)
      toast.error("Failed to load messages")

    }

  }

  useEffect(() => {

    getMessages()

  }, [])

  // Send message
  const sendMessage = async (e) => {

    e.preventDefault()

    if (!user) {
      toast.error("Please login first")
      return
    }

    try {

      await axios.post("http://localhost:3000/messages", {

        senderId: user._id,
        message: text

      })

      setText("")

      toast.success("Message sent")

      getMessages()

    } catch (error) {

      toast.error("Failed to send message")

    }

  }

  return (

    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-10">

      <h1 className="text-3xl font-bold mb-6">
        Messages
      </h1>

      {/* Message List */}

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 h-96 overflow-y-scroll mb-6">

        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet</p>
        ) : (

          messages.map((msg) => (

            <div
              key={msg._id}
              className={`mb-4 flex ${msg.senderId?._id === user?._id ? "justify-end" : "justify-start"}`}
            >

              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.senderId?._id === user?._id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200"
                }`}
              >

                <p className="text-sm font-semibold">
                  {msg.senderId?.firstName || "User"}
                </p>

                <p>{msg.message}</p>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Send Message */}

      <form
        onSubmit={sendMessage}
        className="w-full max-w-2xl flex gap-4"
      >

        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e)=>setText(e.target.value)}
          className="flex-1 border p-3 rounded-lg"
          required
        />

        <button
          className="bg-indigo-600 text-white px-6 rounded-lg hover:bg-indigo-700"
        >
          Send
        </button>

      </form>

    </div>

  )

}