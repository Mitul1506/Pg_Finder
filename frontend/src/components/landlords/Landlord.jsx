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

  // ================= PG FORM =================
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

  // ================= ROOM FORM =================
  const [roomForm, setRoomForm] = useState({
    pgId: "",
    roomType: "",
    totalBeds: "",
    availableBeds: "",
    monthlyRent: "",
    deposit: "",
    roomAmenities: "",
  });

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully 👋");
    navigate("/login");
  };

  // ================= FETCH DATA =================
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

  // ================= HANDLE PG INPUT =================
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
    } catch {
      toast.error("Delete failed");
    }
  };

  // ================= HANDLE ROOM INPUT =================
  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setRoomForm({ ...roomForm, [name]: value });
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

      toast.success("Room Added Successfully 🛏️");

      setRoomForm({
        pgId: "",
        roomType: "",
        totalBeds: "",
        availableBeds: "",
        monthlyRent: "",
        deposit: "",
        roomAmenities: "",
      });

      fetchData();
      setActiveTab("dashboard");
    } catch {
      toast.error("Error adding room");
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

      {/* NAVBAR */}
      <div className="bg-indigo-700 text-white flex justify-between items-center px-6 py-4 font-semibold">

        <div className="flex gap-6">
          <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
          <button onClick={() => setActiveTab("add")}>Add PG</button>
          <button onClick={() => setActiveTab("addRoom")}>Add Room</button>
          <button onClick={() => setActiveTab("pgs")}>Manage PGs</button>
          <button onClick={() => setActiveTab("bookings")}>Bookings</button>
        </div>

        <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded">
          Logout
        </button>
      </div>

      <div className="p-6">

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow text-center">
              <h2>Total PGs</h2>
              <p className="text-2xl">{pgs.length}</p>
            </div>
            <div className="bg-white p-6 rounded shadow text-center">
              <h2>Rooms</h2>
              <p className="text-2xl">{rooms.length}</p>
            </div>
            <div className="bg-white p-6 rounded shadow text-center">
              <h2>Bookings</h2>
              <p className="text-2xl">{bookings.length}</p>
            </div>
          </div>
        )}

        {/* ADD PG */}
        {activeTab === "add" && (
          <form onSubmit={handleAddPg} className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded shadow">
            <input name="pgName" placeholder="PG Name" onChange={handleChange} required />
            <input name="description" placeholder="Description" onChange={handleChange} />
            <input name="city" placeholder="City" onChange={handleChange} />
            <input name="area" placeholder="Area" onChange={handleChange} />
            <input name="min" placeholder="Min Price" onChange={handleChange} />
            <input name="max" placeholder="Max Price" onChange={handleChange} />
            <input name="amenities" placeholder="Amenities" onChange={handleChange} className="col-span-2" />
            <input name="rules" placeholder="Rules" onChange={handleChange} className="col-span-2" />
            <input name="photos" placeholder="Photo URLs" onChange={handleChange} className="col-span-2" />
            <button className="col-span-2 bg-indigo-600 text-white p-2">Add PG</button>
          </form>
        )}

        {/* ADD ROOM */}
        {activeTab === "addRoom" && (
          <form onSubmit={handleAddRoom} className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded shadow">

            <input
  name="pgId"
  placeholder="Enter PG ID"
  value={roomForm.pgId}
  onChange={handleRoomChange}
  className="p-3 border rounded-lg col-span-2"
  required
/>

            <input name="roomType" placeholder="Room Type" onChange={handleRoomChange} required />
            <input name="totalBeds" type="number" placeholder="Total Beds" onChange={handleRoomChange} />
            <input name="availableBeds" type="number" placeholder="Available Beds" onChange={handleRoomChange} />
            <input name="monthlyRent" type="number" placeholder="Rent" onChange={handleRoomChange} />
            <input name="deposit" type="number" placeholder="Deposit" onChange={handleRoomChange} />
            <input name="roomAmenities" placeholder="Amenities" onChange={handleRoomChange} className="col-span-2" />

            <button className="col-span-2 bg-green-600 text-white p-2">
              Add Room
            </button>
          </form>
        )}

        {/* MANAGE PGS */}
        {activeTab === "pgs" && (
          <div className="grid md:grid-cols-3 gap-4">
            {pgs.map(pg => (
              <div key={pg._id} className="bg-white p-4 rounded shadow">
                <img src={pg.photos?.[0]} className="h-40 w-full object-cover" />
                <h3>{pg.pgName}</h3>
                <button onClick={() => handleDeletePg(pg._id)} className="bg-red-500 text-white p-1 mt-2 w-full">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === "bookings" && (
          <table className="w-full bg-white">
            <thead>
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
        )}

      </div>
    </div>
  );
}