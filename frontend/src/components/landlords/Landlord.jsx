import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BuildingOfficeIcon,
  PlusCircleIcon,
  InboxStackIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightOnRectangleIcon,
  PhotoIcon,
  ChevronRightIcon,
  XMarkIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  MapPinIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function Landlord() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [pgs, setPgs] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
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

  const fetchData = async () => {
    try {
      const [pgRes, roomRes, bookingRes, messageRes] = await Promise.all([
        axios.get(`${BASE_URL}/pgs/landlord/${user.id}`),
        axios.get(`${BASE_URL}/rooms/landlord/${user.id}`),
        axios.get(`${BASE_URL}/bookings/landlord/${user.id}`),
        axios.get(`${BASE_URL}/messages/landlord/${user.id}`),
      ]);

      setPgs(pgRes.data.data || []);
      setRooms(roomRes.data.data || []);
      setBookings(bookingRes.data.data || []);
      setMessages(messageRes.data.data || []);
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
    if (!window.confirm("Are you sure you want to delete this PG?")) return;
    try {
      await axios.delete(`${BASE_URL}/pgs/${id}`);
      toast.success("PG Deleted");
      fetchData();
    } catch {
      toast.error("Delete failed");
    }
  };

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
      setReplyInputs((prev) => ({ ...prev, [messageId]: "" }));
      fetchData();
    } catch {
      toast.error("Failed to send reply");
    }
  };

  if (!user) return <h2 className="text-center mt-20">Login first</h2>;
  if (loading) return <h2 className="text-center mt-20">Loading...</h2>;

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon },
    { id: "add", label: "Add PG", icon: PlusCircleIcon },
    { id: "addRoom", label: "Add Room", icon: BuildingOfficeIcon },
    { id: "pgs", label: "Manage PGs", icon: InboxStackIcon },
    { id: "bookings", label: "Bookings", icon: CalendarDaysIcon },
    { id: "messages", label: "Messages", icon: ChatBubbleLeftRightIcon },
  ];

  const stats = [
    { title: "Total PGs", value: pgs.length, icon: BuildingOfficeIcon, color: "bg-blue-500" },
    { title: "Total Rooms", value: rooms.length, icon: UserGroupIcon, color: "bg-emerald-500" },
    { title: "Total Bookings", value: bookings.length, icon: CalendarDaysIcon, color: "bg-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar + Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-72 bg-white shadow-2xl z-50 flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                LandlordHub
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-2">Manage your properties</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <tab.icon
                  className={`h-5 w-5 ${
                    activeTab === tab.id ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-500"
                  }`}
                />
                <span className="font-medium">{tab.label}</span>
                {activeTab === tab.id && <ChevronRightIcon className="h-4 w-4 ml-auto text-indigo-500" />}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-700">{user?.name || "Landlord"}</p>
                <p className="text-xs text-slate-500">Landlord Account</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-72 flex-1 p-8">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
                <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your properties.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-500 text-sm">{stat.title}</p>
                        <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
                      </div>
                      <div className={`h-12 w-12 rounded-xl ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                        <stat.icon className={`h-6 w-6 ${stat.color.replace("bg-", "text-")}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Bookings Preview */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-800">Recent Bookings</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-4 text-slate-600 font-medium">User</th>
                        <th className="text-left p-4 text-slate-600 font-medium">PG</th>
                        <th className="text-left p-4 text-slate-600 font-medium">Room</th>
                        <th className="text-left p-4 text-slate-600 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 4).map((b) => (
                        <tr key={b._id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="p-4 text-slate-700">{b.userId?.firstName} {b.userId?.lastName}</td>
                          <td className="p-4 text-slate-700">{b.pgId?.pgName}</td>
                          <td className="p-4 text-slate-700">{b.roomId?.roomType}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              b.status === "confirmed" ? "bg-green-100 text-green-700" : 
                              b.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                            }`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {bookings.length === 0 && (
                        <tr>
                          <td colSpan="4" className="p-8 text-center text-slate-500">No bookings yet</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Add PG */}
          {activeTab === "add" && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Add New PG</h2>
                <p className="text-slate-500 mt-1">List a new paying guest property</p>
              </div>
              <form onSubmit={handleAddPg} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">PG Name *</label>
                    <input name="pgName" placeholder="e.g., Sunrise PG" onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Description</label>
                    <input name="description" placeholder="Describe your PG..." onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">City</label>
                    <input name="city" placeholder="City" onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Area</label>
                    <input name="area" placeholder="Area/Locality" onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Min Price</label>
                    <input name="min" placeholder="Min Rent" onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Max Price</label>
                    <input name="max" placeholder="Max Rent" onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-slate-700">Amenities (comma separated)</label>
                    <input name="amenities" placeholder="WiFi, Parking, AC, Meals" onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-slate-700">Rules (comma separated)</label>
                    <input name="rules" placeholder="No smoking, No alcohol, 10pm curfew" onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-slate-700">Photos (URLs, comma separated)</label>
                    <input name="photos" placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg" onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all">
                    Add PG
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Add Room */}
          {activeTab === "addRoom" && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Add New Room</h2>
                <p className="text-slate-500 mt-1">Add a room to an existing PG</p>
              </div>
              <form onSubmit={handleAddRoom} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">PG ID *</label>
                    <input name="pgId" placeholder="Enter PG ID" onChange={handleRoomChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Room Type</label>
                    <input name="roomType" placeholder="Single, Double, Dorm" onChange={handleRoomChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Total Beds</label>
                    <input name="totalBeds" type="number" placeholder="Total Beds" onChange={handleRoomChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Available Beds</label>
                    <input name="availableBeds" type="number" placeholder="Available Beds" onChange={handleRoomChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Monthly Rent (₹)</label>
                    <input name="monthlyRent" type="number" placeholder="Rent Amount" onChange={handleRoomChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Deposit (₹)</label>
                    <input name="deposit" type="number" placeholder="Security Deposit" onChange={handleRoomChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-slate-700">Room Amenities (comma separated)</label>
                    <input name="roomAmenities" placeholder="Attached bathroom, Balcony, Study table" onChange={handleRoomChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button type="submit" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all">
                    Add Room
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Manage PGs */}
          {activeTab === "pgs" && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Manage PGs</h2>
                <p className="text-slate-500 mt-1">View and manage your properties</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pgs.map(pg => (
                  <div key={pg._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all group">
                    <div className="relative h-48 overflow-hidden">
                      {pg.photos?.[0] ? (
                        <img src={pg.photos[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={pg.pgName} />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                          <PhotoIcon className="h-12 w-12 text-indigo-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-slate-800">{pg.pgName}</h3>
                      <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{pg.address?.area}, {pg.address?.city}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                        <CurrencyRupeeIcon className="h-4 w-4" />
                        <span>₹{pg.priceRange?.min} - ₹{pg.priceRange?.max}</span>
                      </div>
                      <button onClick={() => handleDeletePg(pg._id)} className="w-full mt-4 flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors">
                        <TrashIcon className="h-4 w-4" />
                        Delete PG
                      </button>
                    </div>
                  </div>
                ))}
                {pgs.length === 0 && (
                  <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-100">
                    <BuildingOfficeIcon className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">No PGs added yet</p>
                    <button onClick={() => setActiveTab("add")} className="mt-3 text-indigo-600 font-medium">Add your first PG →</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bookings */}
          {activeTab === "bookings" && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800">All Bookings</h2>
                <p className="text-slate-500 mt-1">Track all booking requests</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-4 text-slate-600 font-medium">User</th>
                        <th className="text-left p-4 text-slate-600 font-medium">PG</th>
                        <th className="text-left p-4 text-slate-600 font-medium">Room</th>
                        <th className="text-left p-4 text-slate-600 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr key={b._id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="p-4 text-slate-700">{b.userId?.firstName} {b.userId?.lastName}</td>
                          <td className="p-4 text-slate-700">{b.pgId?.pgName}</td>
                          <td className="p-4 text-slate-700">{b.roomId?.roomType}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              b.status === "confirmed" ? "bg-green-100 text-green-700" : 
                              b.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                            }`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {bookings.length === 0 && (
                        <tr>
                          <td colSpan="4" className="p-8 text-center text-slate-500">No bookings found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {activeTab === "messages" && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Messages</h2>
                <p className="text-slate-500 mt-1">Communicate with potential tenants</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <ChatBubbleLeftRightIcon className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">No messages yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {messages.map((m) => (
                      <div key={m._id} className="p-6 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {m.senderId?.firstName?.charAt(0) || "U"}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <h4 className="font-semibold text-slate-800">{m.senderId?.firstName} {m.senderId?.lastName}</h4>
                              <span className="text-xs text-slate-400">{new Date(m.createdAt).toLocaleString()}</span>
                            </div>
                            <p className="text-slate-600 mt-1 bg-slate-50 p-3 rounded-xl">{m.message}</p>
                            
                            {m.reply ? (
                              <div className="mt-3 pl-4 border-l-4 border-green-400">
                                <p className="text-sm text-green-700"><span className="font-medium">Your Reply:</span> {m.reply}</p>
                              </div>
                            ) : (
                              <div className="mt-4">
                                <textarea
                                  placeholder="Write your reply..."
                                  value={replyInputs[m._id] || ""}
                                  onChange={(e) =>
                                    setReplyInputs({
                                      ...replyInputs,
                                      [m._id]: e.target.value,
                                    })
                                  }
                                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                  rows="2"
                                />
                                <button
                                  onClick={() => handleReply(m._id)}
                                  className="mt-2 bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                                >
                                  Send Reply
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}