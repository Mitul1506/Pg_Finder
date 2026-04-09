import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Landlord() {

  const [activeTab, setActiveTab] = useState("dashboard");
  const [pgs, setPgs] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]); // ✅ ADDED
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const BASE_URL = "http://localhost:3000";

  const [formData, setFormData] = useState({
    pgName: "",
    description: "",
    address: { area: "", city: "", state: "", pincode: "" },
    amenities: "",
    rules: "",
    photos: "",
    priceRange: { min: "", max: "" },
  });

  const [roomForm, setRoomForm] = useState({
    pgId: "",
    roomType: "",
    totalBeds: "",
    availableBeds: "",
    monthlyRent: "",
    deposit: "",
    roomAmenities: "",
  });
const [replyInputs, setReplyInputs] = useState({});
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out 👋");
    navigate("/login");
  };

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      const [pgRes, roomRes, bookingRes, messageRes] = await Promise.all([
        axios.get(`${BASE_URL}/pgs/landlord/${user.id}`),
        axios.get(`${BASE_URL}/rooms/landlord/${user.id}`),
        axios.get(`${BASE_URL}/bookings/landlord/${user.id}`),
        axios.get(`${BASE_URL}/messages/landlord/${user.id}`), // ✅ ADDED
      ]);

      setPgs(pgRes.data.data || []);
      setRooms(roomRes.data.data || []);
      setBookings(bookingRes.data.data || []);
      setMessages(messageRes.data.data || []); // ✅ ADDED

    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, []);

  // ================= FORM HANDLERS =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["area", "city", "state", "pincode"].includes(name)) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else if (["min", "max"].includes(name)) {
      setFormData({
        ...formData,
        priceRange: { ...formData.priceRange, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRoomChange = (e) => {
    setRoomForm({ ...roomForm, [e.target.name]: e.target.value });
  };

  // ================= ADD PG =================
  const handleAddPg = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/pgs`, {
        ...formData,
        landlordId: user.id,
        amenities: formData.amenities.split(","),
        rules: formData.rules.split(","),
        photos: formData.photos.split(","),
      });

      toast.success("PG Added 🚀");
      fetchData();
      setActiveTab("pgs");
    } catch {
      toast.error("Error adding PG");
    }
  };

  // ================= ADD ROOM =================
  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/rooms`, {
        ...roomForm,
        totalBeds: Number(roomForm.totalBeds),
        availableBeds: Number(roomForm.availableBeds),
        monthlyRent: Number(roomForm.monthlyRent),
        deposit: Number(roomForm.deposit),
        roomAmenities: roomForm.roomAmenities.split(","),
      });

      toast.success("Room Added 🛏️");
      fetchData();
      setActiveTab("dashboard");
    } catch {
      toast.error("Error adding room");
    }
  };

  // ================= DELETE PG =================
  const handleDeletePg = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/pgs/${id}`);
      toast.success("Deleted");
      fetchData();
    } catch {
      toast.error("Delete failed");
    }
  };

  // ================= REPLY MESSAGE =================
  const handleReply = async (messageId) => {
    const replyText = replyInputs[messageId];

    if (!replyText || !replyText.trim()) {
      return toast.error("Reply cannot be empty");
    }

    try {
      await axios.put(`${BASE_URL}/messages/${messageId}`, {
        reply: replyText,
      });

      toast.success("Reply sent ✅");

      // clear input
      setReplyInputs((prev) => ({ ...prev, [messageId]: "" }));

      fetchData();
    } catch {
      toast.error("Failed to send reply");
    }
  };

  if (!user) return <h2 className="text-center mt-20">Login first</h2>;
  if (loading) return <h2 className="text-center mt-20">Loading...</h2>;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex gap-6 font-medium">
          <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
          <button onClick={() => setActiveTab("add")}>Add PG</button>
          <button onClick={() => setActiveTab("addRoom")}>Add Room</button>
          <button onClick={() => setActiveTab("pgs")}>Manage PGs</button>
          <button onClick={() => setActiveTab("bookings")}>Bookings</button>
          <button onClick={() => setActiveTab("messages")}>Messages</button> {/* ✅ ADDED */}
        </div>

        <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      <div className="p-6">

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="grid md:grid-cols-3 gap-6">
            {[{ title: "Total PGs", value: pgs.length },
              { title: "Rooms", value: rooms.length },
              { title: "Bookings", value: bookings.length }].map((card, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md text-center">
                <h2 className="text-gray-500">{card.title}</h2>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* ADD PG */}
        {activeTab === "add" && (
          <form onSubmit={handleAddPg} className="bg-white p-6 rounded-2xl shadow grid md:grid-cols-2 gap-4">
            <input name="pgName" placeholder="PG Name" onChange={handleChange} className="input" required />
            <input name="description" placeholder="Description" onChange={handleChange} className="input" />
            <input name="city" placeholder="City" onChange={handleChange} className="input" />
            <input name="area" placeholder="Area" onChange={handleChange} className="input" />
            <input name="min" placeholder="Min Price" onChange={handleChange} className="input" />
            <input name="max" placeholder="Max Price" onChange={handleChange} className="input" />
            <input name="amenities" placeholder="Amenities" onChange={handleChange} className="input col-span-2" />
            <input name="rules" placeholder="Rules" onChange={handleChange} className="input col-span-2" />
            <input name="photos" placeholder="Photos" onChange={handleChange} className="input col-span-2" />

            <button className="col-span-2 bg-indigo-600 text-white py-2 rounded-lg">
              Add PG
            </button>
          </form>
        )}

        {/* ADD ROOM */}
        {activeTab === "addRoom" && (
          <form onSubmit={handleAddRoom} className="bg-white p-6 rounded-2xl shadow grid md:grid-cols-2 gap-4">
            <input name="pgId" placeholder="PG ID" onChange={handleRoomChange} className="input col-span-2" required />
            <input name="roomType" placeholder="Room Type" onChange={handleRoomChange} className="input" />
            <input name="totalBeds" type="number" placeholder="Total Beds" onChange={handleRoomChange} className="input" />
            <input name="availableBeds" type="number" placeholder="Available Beds" onChange={handleRoomChange} className="input" />
            <input name="monthlyRent" type="number" placeholder="Rent" onChange={handleRoomChange} className="input" />
            <input name="deposit" type="number" placeholder="Deposit" onChange={handleRoomChange} className="input" />
            <input name="roomAmenities" placeholder="Amenities" onChange={handleRoomChange} className="input col-span-2" />

            <button className="col-span-2 bg-green-600 text-white py-2 rounded-lg">
              Add Room
            </button>
          </form>
        )}

        {/* MANAGE PGS */}
        {activeTab === "pgs" && (
          <div className="grid md:grid-cols-3 gap-6">
            {pgs.map(pg => (
              <div key={pg._id} className="bg-white rounded-2xl shadow">
                <img src={pg.photos?.[0]} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h3>{pg.pgName}</h3>
                  <button onClick={() => handleDeletePg(pg._id)} className="bg-red-500 text-white w-full mt-2">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-2xl shadow overflow-x-auto">
            <table className="w-full text-center">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th>User</th>
                  <th>PG</th>
                  <th>Room</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id}>
                    <td>{b.userId?.firstName}</td>
                    <td>{b.pgId?.pgName}</td>
                    <td>{b.roomId?.roomType}</td>
                    <td>{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ✅ UPDATED MESSAGES */}
        {activeTab === "messages" && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">User Messages</h2>

            {messages.length === 0 ? (
              <p>No messages</p>
            ) : (
              messages.map((m) => (
                <div key={m._id} className="border p-3 mb-3 rounded">
                  <p><b>User:</b> {m.senderId?.firstName}</p>
                  <p><b>Message:</b> {m.message}</p>

                  {m.reply ? (
                    <p className="text-green-600">
                      <b>Reply:</b> {m.reply}
                    </p>
                  ) : (
                    <div className="mt-2">
                      <textarea
                        placeholder="Write reply..."
                        value={replyInputs[m._id] || ""}
                        onChange={(e) =>
                          setReplyInputs({
                            ...replyInputs,
                            [m._id]: e.target.value,
                          })
                        }
                        className="w-full border p-2 rounded"
                      />

                      <button
                        onClick={() => handleReply(m._id)}
                        className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
                      >
                        Send Reply
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}