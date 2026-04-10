import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MapPinIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
  WifiIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  FireIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [pg, setPg] = useState(null);
  const [message, setMessage] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [loading, setLoading] = useState(true);

  const { pgId } = useParams();
  const navigate = useNavigate();

  const getRooms = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/rooms/pg/${pgId}`);
      setRooms(res.data.data);
    } catch (err) {
      toast.error("Failed to load rooms");
    }
  };

  const getPgDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/pgs/${pgId}`);
      setPg(res.data.data);
    } catch (err) {
      toast.error("Failed to load PG details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRooms();
    getPgDetails();
  }, []);

  const handleSendMessage = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.error("Please login first");
        navigate("/login", { state: { from: `/RoomList/${pgId}` } });
        return;
      }

      if (!message.trim()) {
        toast.error("Message cannot be empty");
        return;
      }

      await axios.post("http://localhost:3000/messages", {
        senderId: user.id,
        receiverId: pg.landlordId._id,
        pgId: pg._id,
        message,
      });

      toast.success("Message sent ✅");
      setMessage("");
      setShowMessageBox(false);
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

  const getAvailabilityStatus = (availableBeds, totalBeds) => {
    if (availableBeds === 0) return { text: "Fully Booked", color: "bg-red-100 text-red-700", icon: XCircleIcon };
    if (availableBeds <= totalBeds / 3) return { text: "Limited Availability", color: "bg-orange-100 text-orange-700", icon: ClockIcon };
    return { text: "Available Now", color: "bg-green-100 text-green-700", icon: CheckCircleIcon };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-24 left-6 z-20 bg-white shadow-lg p-3 rounded-full hover:shadow-xl transition-all group"
      >
        <ArrowLeftIcon className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
      </button>

      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white pt-24 pb-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {pg?.pgName || "PG Rooms"}
              </h1>
              <div className="flex items-center gap-2 text-white/90">
                <MapPinIcon className="h-5 w-5" />
                <span>{pg?.address?.area}, {pg?.address?.city}, {pg?.address?.state}</span>
              </div>
              {pg?.verificationBadge && (
                <div className="flex items-center gap-1 mt-2 bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full inline-flex">
                  <ShieldCheckIcon className="h-4 w-4" />
                  <span className="text-sm">Verified Property</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-center">
                <div className="text-2xl font-bold">{rooms.length}</div>
                <div className="text-xs">Total Rooms</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-center">
                <div className="text-2xl font-bold">
                  {rooms.reduce((sum, room) => sum + (room.availableBeds || 0), 0)}
                </div>
                <div className="text-xs">Available Beds</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* PG AMENITIES SECTION */}
        {pg && pg.amenities && pg.amenities.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BuildingOfficeIcon className="h-5 w-5 text-indigo-600" />
              Property Amenities
            </h2>
            <div className="flex flex-wrap gap-2">
              {pg.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1"
                >
                  {amenity === "WiFi" && <WifiIcon className="h-4 w-4" />}
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ROOMS GRID */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <HomeIcon className="h-6 w-6 text-indigo-600" />
            Available Rooms
          </h2>
          
          {rooms.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <BuildingOfficeIcon className="h-20 w-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No rooms available at the moment</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => {
                const status = getAvailabilityStatus(room.availableBeds, room.totalBeds);
                const StatusIcon = status.icon;
                
                return (
                  <div
                    key={room._id}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                  >
                    {/* IMAGE */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={room.photos?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"}
                        alt={room.roomType}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Availability Badge */}
                      <div className="absolute top-3 left-3">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${status.color} backdrop-blur-sm`}>
                          <StatusIcon className="h-3 w-3" />
                          <span className="text-xs font-medium">{status.text}</span>
                        </div>
                      </div>
                      
                      {/* Price Badge */}
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                        <div className="flex items-baseline gap-1">
                          <CurrencyRupeeIcon className="h-3 w-3 text-white" />
                          <span className="text-white font-bold text-lg">{room.monthlyRent}</span>
                          <span className="text-white/70 text-xs">/month</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      {/* Room Type */}
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-800">
                          {room.roomType} Room
                        </h3>
                        {room.isFeatured && (
                          <FireIcon className="h-5 w-5 text-orange-500" />
                        )}
                      </div>
                      
                      {/* Beds Info */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                          <UserGroupIcon className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">Total Beds</p>
                          <p className="font-semibold text-gray-800">{room.totalBeds}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                          <HomeIcon className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">Available</p>
                          <p className={`font-semibold ${room.availableBeds > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {room.availableBeds}
                          </p>
                        </div>
                      </div>
                      
                      {/* Deposit */}
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                        <span className="text-gray-600 text-sm">Security Deposit</span>
                        <span className="font-semibold text-gray-800">₹{room.deposit}</span>
                      </div>
                      
                      {/* Room Amenities */}
                      {room.roomAmenities && room.roomAmenities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {room.roomAmenities.slice(0, 3).map((a, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg"
                            >
                              {a}
                            </span>
                          ))}
                          {room.roomAmenities.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg">
                              +{room.roomAmenities.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* View Details Button Only */}
                      <button
                        onClick={() => navigate(`/room/${room._id}`)}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CONTACT & MESSAGE SECTION */}
        {pg?.landlordId && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                Contact Property Owner
              </h2>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {pg.landlordId.firstName?.charAt(0)}{pg.landlordId.lastName?.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {pg.landlordId.firstName} {pg.landlordId.lastName}
                  </h3>
                  <p className="text-gray-500 text-sm">Property Owner</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <StarSolidIcon className="h-4 w-4" />
                      <StarSolidIcon className="h-4 w-4" />
                      <StarSolidIcon className="h-4 w-4" />
                      <StarSolidIcon className="h-4 w-4" />
                      <StarSolidIcon className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-gray-500">(128 reviews)</span>
                  </div>
                </div>
              </div>
              
              {!showMessageBox ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowMessageBox(true)}
                    className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    Send Message
                  </button>
                  <button
                    onClick={() => toast.info("Phone number visible after booking")}
                    className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                  >
                    <PhoneIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              ) : (
                <div>
                  <textarea
                    placeholder="Write your message here... Ask about availability, pricing, or schedule a visit!"
                    className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={handleSendMessage}
                      className="flex-1 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-all duration-300 font-medium"
                    >
                      Send Message
                    </button>
                    <button
                      onClick={() => setShowMessageBox(false)}
                      className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  💡 Tip: Introduce yourself and mention your move-in date for faster response
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}