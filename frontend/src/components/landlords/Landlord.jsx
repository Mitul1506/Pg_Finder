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

  const [formData, setFormData] = useState({
    pgName: "",
    description: "",
    pgType: "Boys",
    availabilityStatus: "Available",
    address: { area: "", city: "", state: "", pincode: "" },
    amenities: "",
    rules: "",
    photos: "",
    priceRange: { min: "", max: "" },
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const BASE_URL = "http://localhost:3000";

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully 👋");
    navigate("/login");
  };

  // ================= FETCH =================
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
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, []);

  // ================= HANDLE CHANGE =================
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

      toast.success("PG Added Successfully 🚀");

      setFormData({
        pgName: "",
        description: "",
        pgType: "Boys",
        availabilityStatus: "Available",
        address: { area: "", city: "", state: "", pincode: "" },
        amenities: "",
        rules: "",
        photos: "",
        priceRange: { min: "", max: "" },
      });

      fetchData();
      setActiveTab("pgs");
    } catch (err) {
      toast.error("Error adding PG");
    }
  };

  // ================= DELETE PG =================
  const handleDeletePg = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/pgs/${id}`);
      toast.success("PG Deleted ❌");
      fetchData();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ================= AUTH CHECK =================
  if (!user) {
    return <h2 className="text-center mt-20 text-xl">Please login first</h2>;
  }

  if (loading) {
    return <h2 className="text-center mt-20 text-xl">Loading Dashboard...</h2>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">

      {/* ================= NAVBAR ================= */}
      <div className="bg-indigo-700 text-white flex justify-between items-center px-6 py-4 text-lg font-semibold shadow-md sticky top-0 z-50">

        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={activeTab === "dashboard" ? "underline text-yellow-300" : ""}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={activeTab === "add" ? "underline text-yellow-300" : ""}
          >
            Add PG
          </button>

          <button
            onClick={() => setActiveTab("pgs")}
            className={activeTab === "pgs" ? "underline text-yellow-300" : ""}
          >
            Manage PGs
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={activeTab === "bookings" ? "underline text-yellow-300" : ""}
          >
            Bookings
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-6">

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">
              📊 Dashboard Overview
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow text-center">
                <p>Total PGs</p>
                <h2 className="text-3xl font-bold text-indigo-600">{pgs.length}</h2>
              </div>

              <div className="bg-white p-6 rounded-xl shadow text-center">
                <p>Rooms</p>
                <h2 className="text-3xl font-bold text-green-600">{rooms.length}</h2>
              </div>

              <div className="bg-white p-6 rounded-xl shadow text-center">
                <p>Bookings</p>
                <h2 className="text-3xl font-bold text-orange-600">{bookings.length}</h2>
              </div>
            </div>
          </>
        )}

        {/* ADD PG */}
        {activeTab === "add" && (
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">➕ Add New PG</h2>

            <form onSubmit={handleAddPg} className="grid md:grid-cols-2 gap-4">

              <input name="pgName" placeholder="PG Name" value={formData.pgName} onChange={handleChange} className="p-3 border rounded-lg" required />
              <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="p-3 border rounded-lg" required />

              <input name="city" placeholder="City" onChange={handleChange} className="p-3 border rounded-lg" />
              <input name="area" placeholder="Area" onChange={handleChange} className="p-3 border rounded-lg" />

              <input name="min" type="number" placeholder="Min Price" onChange={handleChange} className="p-3 border rounded-lg" />
              <input name="max" type="number" placeholder="Max Price" onChange={handleChange} className="p-3 border rounded-lg" />

              <input name="amenities" placeholder="Amenities" onChange={handleChange} className="p-3 border rounded-lg col-span-2" />
              <input name="rules" placeholder="Rules" onChange={handleChange} className="p-3 border rounded-lg col-span-2" />
              <input name="photos" placeholder="Photo URLs" onChange={handleChange} className="p-3 border rounded-lg col-span-2" />

              <button className="bg-indigo-600 text-white p-3 rounded-lg col-span-2 hover:bg-indigo-700">
                Add PG 🚀
              </button>
            </form>
          </div>
        )}

        {/* MANAGE PGS */}
        {activeTab === "pgs" && (
          <div className="grid md:grid-cols-3 gap-6">
            {pgs.map((pg) => (
              <div key={pg._id} className="bg-white p-5 rounded-xl shadow hover:shadow-xl">

                <img
                  src={pg.photos?.[0] || "https://via.placeholder.com/300"}
                  className="h-40 w-full object-cover rounded-lg mb-3"
                />

                <h3 className="text-xl font-semibold text-indigo-700">{pg.pgName}</h3>
                <p className="text-sm">{pg.address?.city}</p>

                <button
                  onClick={() => handleDeletePg(pg._id)}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded w-full"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">PG</th>
                  <th className="p-3">Room</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b text-center">
                    <td className="p-3">{b.userId?.firstName}</td>
                    <td className="p-3">{b.pgId?.pgName}</td>
                    <td className="p-3">{b.roomId?.roomType}</td>
                    <td className="p-3">{b.status}</td>
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