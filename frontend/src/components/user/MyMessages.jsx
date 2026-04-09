import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function MyMessages() {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const BASE_URL = "http://localhost:3000";

  // ================= FETCH MESSAGES =================
  const getMessages = async () => {
    try {

      const res = await axios.get(
        `${BASE_URL}/messages/user/${user.id}`
      );

      setMessages(res.data.data || []);

    } catch (err) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getMessages();
  }, []);

  if (!user) {
    return <h2 className="text-center mt-20">Please login first</h2>;
  }

  if (loading) {
    return <h2 className="text-center mt-20">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">

      <h1 className="text-3xl font-bold text-center mb-8">
        My Messages 📩
      </h1>

      {messages.length === 0 ? (
        <p className="text-center text-gray-500">
          No messages yet
        </p>
      ) : (

        <div className="max-w-2xl mx-auto space-y-6">

          {messages.map((m) => (

            <div
              key={m._id}
              className="bg-white p-5 rounded-xl shadow"
            >

              {/* PG NAME */}
              <p className="text-indigo-600 font-semibold">
                PG: {m.pgId?.pgName || "N/A"}
              </p>

              {/* USER MESSAGE */}
              <div className="mt-3">
                <p className="text-sm text-gray-500">You:</p>
                <p className="bg-gray-200 inline-block px-3 py-2 rounded-lg mt-1">
                  {m.message}
                </p>
              </div>

              {/* OWNER REPLY */}
              <div className="mt-4">
                <p className="text-sm text-gray-500">Owner:</p>

                {m.reply ? (
                  <p className="bg-green-100 inline-block px-3 py-2 rounded-lg mt-1 text-green-700">
                    {m.reply}
                  </p>
                ) : (
                  <p className="text-gray-400 italic mt-1">
                    Waiting for reply...
                  </p>
                )}
              </div>

              {/* DATE */}
              <p className="text-xs text-gray-400 mt-4">
                {new Date(m.createdAt).toLocaleString()}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}