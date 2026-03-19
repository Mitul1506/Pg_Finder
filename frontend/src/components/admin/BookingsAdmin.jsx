import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const BASE_URL = "http://localhost:3000";

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= FETCH BOOKINGS =================
  const fetchBookings = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/bookings`)

    console.log("API RESPONSE 👉", res.data); // 👈 ADD THIS

    setBookings(res.data.data || []);
  } catch (err) {
    console.log(err);
    toast.error("Failed to load bookings");
  }
};
  useEffect(() => {
    if (user) fetchBookings();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/bookings/${id}`);
      toast.success("Booking deleted");
      fetchBookings();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ================= STATUS UPDATE =================
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${BASE_URL}/bookings/status/${id}`, {
        status,
      });

      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  // ================= SEARCH FILTER =================
  const filteredBookings = bookings.filter((b) =>
    b.pgId?.pgName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Manage Bookings
      </h1>

      {/* SEARCH */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by PG..."
          className="border p-2 w-80 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">

          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">PG</th>
              <th className="p-3">Room</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b._id} className="border-b text-center">

                <td className="p-3">{b.userId?.firstName}</td>
                <td className="p-3">{b.pgId?.pgName}</td>
                <td className="p-3">{b.roomId?.roomType}</td>

                <td className="p-3">
                  {new Date(b.bookingDate).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    b.status === "confirmed"
                      ? "bg-green-100 text-green-600"
                      : b.status === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {b.status}
                  </span>
                </td>

                <td className="p-3 space-x-2">

                  <button
                    onClick={() => updateStatus(b._id, "confirmed")}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(b._id, "cancelled")}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleDelete(b._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}