import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  HomeIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disputes, setDisputes] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const getBookings = async () => {
    try {
      const userId = user._id || user.id;
      const res = await axios.get(`http://localhost:3000/bookings/user/${userId}`);
      setBookings(res.data.data);

      const disputesData = {};
      for (let b of res.data.data) {
        try {
          const d = await axios.get(`http://localhost:3000/disputes/booking/${b._id}`);
          disputesData[b._id] = d.data.data;
        } catch (err) {
          disputesData[b._id] = null;
        }
      }
      setDisputes(disputesData);
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axios.put(`http://localhost:3000/bookings/cancel/${id}`);
      toast.success("Booking cancelled successfully");
      getBookings();
    } catch (err) {
      toast.error("Cancel failed");
    }
  };

  const openDisputeModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const submitDispute = async () => {
    try {
      if (!issueType || !description) {
        toast.error("Fill all fields");
        return;
      }

      await axios.post("http://localhost:3000/disputes", {
        bookingId: selectedBooking._id,
        raisedBy: user._id || user.id,
        againstUserId: selectedBooking.pgId?.landlordId,
        issueType,
        description,
      });

      toast.success("Dispute raised successfully");
      setShowModal(false);
      setIssueType("");
      setDescription("");
      getBookings();
    } catch (err) {
      toast.error("Failed to raise dispute");
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const getStatusConfig = (status) => {
    switch (status) {
      case "confirmed":
        return { text: "Confirmed", color: "bg-green-100 text-green-700", icon: CheckCircleIcon };
      case "pending":
        return { text: "Pending", color: "bg-yellow-100 text-yellow-700", icon: ClockIcon };
      case "cancelled":
        return { text: "Cancelled", color: "bg-red-100 text-red-700", icon: XCircleIcon };
      default:
        return { text: status, color: "bg-gray-100 text-gray-700", icon: ClockIcon };
    }
  };

  const getPaymentConfig = (status) => {
    switch (status) {
      case "paid":
        return { text: "Paid", color: "bg-green-100 text-green-700", icon: CheckCircleIcon };
      case "failed":
        return { text: "Failed", color: "bg-red-100 text-red-700", icon: XCircleIcon };
      default:
        return { text: "Pending", color: "bg-yellow-100 text-yellow-700", icon: ClockIcon };
    }
  };

  const getDisputeStatusConfig = (status) => {
    switch (status) {
      case "resolved":
        return { text: "Resolved", color: "bg-green-100 text-green-700", icon: CheckCircleIcon };
      case "rejected":
        return { text: "Rejected", color: "bg-red-100 text-red-700", icon: XCircleIcon };
      default:
        return { text: "Under Review", color: "bg-yellow-100 text-yellow-700", icon: ClockIcon };
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    const matchesSearch = searchTerm === "" || 
      booking.roomId?.roomType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.pgId?.pgName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    pending: bookings.filter(b => b.status === "pending").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      
      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white pt-24 pb-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">My Bookings</h1>
          <p className="text-white/90 text-lg">Track and manage all your booking requests</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <DocumentTextIcon className="h-8 w-8 text-indigo-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-yellow-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              </div>
              <XCircleIcon className="h-8 w-8 text-red-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* FILTERS AND SEARCH */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by room or PG name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-2">
              {["all", "confirmed", "pending", "cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg capitalize transition-all ${
                    filterStatus === status
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BOOKINGS GRID */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <HomeIcon className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No bookings found</p>
            <button
              onClick={() => window.location.href = "/pg-list"}
              className="mt-4 text-indigo-600 font-medium hover:text-indigo-700"
            >
              Browse PGs →
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((b) => {
              const statusConfig = getStatusConfig(b.status);
              const paymentConfig = getPaymentConfig(b.paymentStatus);
              const dispute = disputes[b._id];
              const StatusIcon = statusConfig.icon;
              const PaymentIcon = paymentConfig.icon;
              
              return (
                <div key={b._id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Header with Status */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-4 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">
                          {b.roomId?.roomType} Room
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          <BuildingOfficeIcon className="h-3 w-3 inline mr-1" />
                          {b.pgId?.pgName}
                        </p>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${statusConfig.color}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span className="text-xs font-medium">{statusConfig.text}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Booking Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Monthly Rent</span>
                        <span className="font-semibold text-gray-800">₹{b.roomId?.monthlyRent}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Payment Status</span>
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${paymentConfig.color}`}>
                          <PaymentIcon className="h-3 w-3" />
                          <span className="text-xs font-medium">{paymentConfig.text}</span>
                        </div>
                      </div>
                      {b.createdAt && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">Booked On</span>
                          <span className="text-sm text-gray-700">
                            {new Date(b.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      {b.status !== "cancelled" && b.status !== "confirmed" && (
                        <button
                          onClick={() => cancelBooking(b._id)}
                          className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors font-medium"
                        >
                          <XCircleIcon className="h-4 w-4" />
                          Cancel Booking
                        </button>
                      )}

                      {!dispute && b.status === "confirmed" && (
                        <button
                          onClick={() => openDisputeModal(b)}
                          className="w-full flex items-center justify-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl hover:bg-yellow-100 transition-colors font-medium"
                        >
                          <ExclamationTriangleIcon className="h-4 w-4" />
                          Raise Dispute
                        </button>
                      )}

                      {dispute && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-start gap-2">
                            <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">
                                Issue: {dispute.issueType}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {dispute.description}
                              </p>
                              <div className="mt-2 pt-2 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">Dispute Status</span>
                                  {(() => {
                                    const disputeConfig = getDisputeStatusConfig(dispute.status);
                                    const DisputeIcon = disputeConfig.icon;
                                    return (
                                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${disputeConfig.color}`}>
                                        <DisputeIcon className="h-3 w-3" />
                                        <span className="text-xs font-medium">{disputeConfig.text}</span>
                                      </div>
                                    );
                                  })()}
                                </div>
                                {dispute.adminRemarks && (
                                  <p className="text-xs text-gray-600 mt-2">
                                    <span className="font-medium">Admin Remarks:</span> {dispute.adminRemarks}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DISPUTE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in">
            <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 rounded-t-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ExclamationTriangleIcon className="h-6 w-6" />
                Raise a Dispute
              </h2>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Type *
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select an issue type</option>
                  <option value="Room Issue">🏠 Room Issue</option>
                  <option value="Payment Issue">💰 Payment Issue</option>
                  <option value="Owner Misbehavior">👤 Owner Misbehavior</option>
                  <option value="Amenities Missing">🔧 Amenities Missing</option>
                  <option value="Other">📝 Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  placeholder="Please provide detailed information about your issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={submitDispute}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Submit Dispute
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}