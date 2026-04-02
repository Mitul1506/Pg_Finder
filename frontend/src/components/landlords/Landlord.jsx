import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Landlord() {

  const [activeTab, setActiveTab] = useState("dashboard");
  const [pgs, setPgs] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out 👋");
    navigate("/login");
  };

  const fetchData = async () => {
    try {
      const [pgRes, roomRes, bookingRes] = await Promise.all([
        axios.get(`${BASE_URL}/pgs/landlord/${user.id}`),
        axios.get(`${BASE_URL}/rooms/landlord/${user.id}`),
        axios.get(`${BASE_URL}/bookings/landlord/${user.id}`),
      ]);

      setPgs(pgRes.data.data || []);
      setRooms(roomRes.data.data || []);
      setBookings(bookingRes.data.data || []);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, []);

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

  const handleDeletePg = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/pgs/${id}`);
      toast.success("Deleted");
      fetchData();
    } catch {
      toast.error("Delete failed");
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
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
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
            <input name="amenities" placeholder="Amenities (comma separated)" onChange={handleChange} className="input col-span-2" />
            <input name="rules" placeholder="Rules" onChange={handleChange} className="input col-span-2" />
            <input name="photos" placeholder="Photo URLs" onChange={handleChange} className="input col-span-2" />

            <button className="col-span-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
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

            <button className="col-span-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Add Room
            </button>
          </form>
        )}

        {/* MANAGE PGS */}
        {activeTab === "pgs" && (
          <div className="grid md:grid-cols-3 gap-6">
            {pgs.map(pg => (
              <div key={pg._id} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
                <img src={pg.photos?.[0]} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{pg.pgName}</h3>
                  <button
                    onClick={() => handleDeletePg(pg._id)}
                    className="bg-red-500 text-white w-full mt-3 py-1 rounded hover:bg-red-600"
                  >
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
                  <th className="p-3">User</th>
                  <th className="p-3">PG</th>
                  <th className="p-3">Room</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id} className="border-b">
                    <td className="p-3">{b.userId?.firstName}</td>
                    <td>{b.pgId?.pgName}</td>
                    <td>{b.roomId?.roomType}</td>
                    <td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}