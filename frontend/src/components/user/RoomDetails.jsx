import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewSection from "/src/components/user/ReviewSection";
import {
  ArrowLeftIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
  HomeIcon,
  ShieldCheckIcon,
  WifiIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
  KeyIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  CreditCardIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  StarIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const getRoom = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/rooms/${id}`);
      setRoom(res.data.data);
    } catch (err) {
      toast.error("Failed to load room");
    }
  };

  useEffect(() => {
    getRoom();
  }, []);

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user) {
      toast.error("Please login first");
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });
      return;
    }

    if (room.availableBeds <= 0) {
      toast.error("Room is already full");
      return;
    }

    try {
      setPaymentProcessing(true);

      const resScript = await loadRazorpay();

      if (!resScript) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const orderRes = await axios.post(
        "http://localhost:3000/payments/create-order",
        {
          amount: room.monthlyRent,
        }
      );

      const order = orderRes.data.data;

      const options = {
        key: "rzp_test_SY8yaDx0SnQtTG",
        amount: order.amount,
        currency: "INR",
        name: "PG Finder",
        description: "Room Booking Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "http://localhost:3000/payments/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyRes.data.success) {
              await axios.post(
                "http://localhost:3000/bookings",
                {
                  userId: user._id || user.id,
                  roomId: room._id,
                  pgId: room.pgId?._id || room.pgId,
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              toast.success("Payment successful & Room booked 🎉");

              setTimeout(() => {
                navigate("/mybookings");
              }, 1000);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            toast.error("Error verifying payment");
          }
        },

        prefill: {
          name: user.firstName + " " + user.lastName,
          email: user.email,
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      toast.error("Payment failed");
    } finally {
      setPaymentProcessing(false);
    }
  };

  if (!room)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading room details...</p>
        </div>
      </div>
    );

  const isAvailable = room.availableBeds > 0;
  const availabilityStatus = isAvailable
    ? { text: "Available Now", color: "bg-green-100 text-green-700", icon: CheckCircleIcon }
    : { text: "Fully Booked", color: "bg-red-100 text-red-700", icon: ClockIcon };

  const AvailabilityIcon = availabilityStatus.icon;

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
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Room Details</h1>
          <p className="text-white/90 text-lg">Complete information about your selected room</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN - MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* IMAGE GALLERY */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={room.photos?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"}
                  alt={room.roomType}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${availabilityStatus.color} backdrop-blur-sm`}>
                    <AvailabilityIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">{availabilityStatus.text}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ROOM INFORMATION */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {room.roomType} Room
                </h2>
                {room.isFeatured && (
                  <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                    <FireIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Featured</span>
                  </div>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <UserGroupIcon className="h-5 w-5" />
                    <span className="font-medium">Bed Information</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-semibold">Total Beds:</span> {room.totalBeds}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Available Beds:</span>{" "}
                      <span className={isAvailable ? "text-green-600" : "text-red-600"}>
                        {room.availableBeds}
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <CurrencyRupeeIcon className="h-5 w-5" />
                    <span className="font-medium">Pricing</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-semibold">Monthly Rent:</span> ₹{room.monthlyRent}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Security Deposit:</span> ₹{room.deposit}
                    </p>
                  </div>
                </div>
              </div>

              {/* PG Information */}
              {room.pgId && (
                <div className="mb-6 p-4 bg-indigo-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <BuildingOfficeIcon className="h-5 w-5 text-indigo-600" />
                    PG Information
                  </h3>
                  <p className="text-gray-700">
                    <span className="font-medium">PG Name:</span> {room.pgId.pgName}
                  </p>
                  <p className="text-gray-700 text-sm mt-1">
                    <MapPinIcon className="h-4 w-4 inline mr-1" />
                    {room.pgId.address?.area}, {room.pgId.address?.city}
                  </p>
                </div>
              )}
            </div>

            {/* AMENITIES */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />
                Room Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {room.roomAmenities?.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                    {a === "WiFi" && <WifiIcon className="h-4 w-4 text-indigo-600" />}
                    {a === "Attached Bathroom" && <KeyIcon className="h-4 w-4 text-indigo-600" />}
                    {a === "Study Table" && <AcademicCapIcon className="h-4 w-4 text-indigo-600" />}
                    <span className="text-gray-700 text-sm">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* REVIEW SECTION */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <ReviewSection pgId={room.pgId?._id || room.pgId} />
            </div>
          </div>

          {/* RIGHT COLUMN - BOOKING SUMMARY */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Booking Card */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <CreditCardIcon className="h-5 w-5" />
                    Booking Summary
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Room Type</span>
                      <span className="font-semibold text-gray-800">{room.roomType}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Monthly Rent</span>
                      <span className="font-bold text-2xl text-indigo-600">₹{room.monthlyRent}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Security Deposit</span>
                      <span className="font-semibold text-gray-800">₹{room.deposit}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Total Beds</span>
                      <span className="font-semibold text-gray-800">{room.totalBeds}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Available Beds</span>
                      <span className={`font-semibold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                        {room.availableBeds}
                      </span>
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Total Amount to Pay</span>
                      <span className="text-2xl font-bold text-indigo-600">₹{room.monthlyRent}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      * Security deposit will be collected separately
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {!isAvailable && (
                    <div className="bg-red-50 rounded-xl p-4 mb-4">
                      <div className="flex items-center gap-2 text-red-700">
                        <ClockIcon className="h-5 w-5" />
                        <span className="font-medium">Room is currently full</span>
                      </div>
                      <p className="text-sm text-red-600 mt-1">Please check other available rooms</p>
                    </div>
                  )}

                  <button
                    onClick={handlePayment}
                    disabled={paymentProcessing || !isAvailable}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      !isAvailable
                        ? "bg-gray-300 cursor-not-allowed text-gray-500"
                        : paymentProcessing
                        ? "bg-gray-400 cursor-wait text-white"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg text-white"
                    }`}
                  >
                    {paymentProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCardIcon className="h-5 w-5" />
                        {isAvailable ? "Pay & Book Room" : "Not Available"}
                      </>
                    )}
                  </button>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <ShieldCheckIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Secure Payment</p>
                        <p className="text-xs text-blue-600">Your payment is secured with Razorpay</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Have questions about booking? Contact our support team.
                </p>
                <button className="w-full text-indigo-600 font-medium text-sm hover:text-indigo-700">
                  Contact Support →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}