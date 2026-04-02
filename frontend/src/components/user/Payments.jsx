import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Payments() {

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const BASE_URL = "http://localhost:3000";

  // ================= FETCH PAYMENTS =================
  const fetchPayments = async () => {
    try {

      const res = await axios.get(
        `${BASE_URL}/bookings/user/${user._id || user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPayments(res.data.data || []);

    } catch (err) {
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchPayments();
  }, []);

  // ================= UI =================
  if (loading) {
    return (
      <h2 className="text-center mt-20 text-xl">
        Loading payments...
      </h2>
    );
  }

  return (
    <div className="pt-24 px-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-center mb-10">
        💳 Payment History
      </h1>

      {payments.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No payments found
        </div>
      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {payments.map((p) => (

            <div
              key={p._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-3">

                <h2 className="text-xl font-bold text-indigo-600">
                  {p.pgId?.pgName}
                </h2>

                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                  Paid ✅
                </span>

              </div>

              {/* DETAILS */}
              <p className="text-gray-600">
                Room: <b>{p.roomId?.roomType}</b>
              </p>

              <p className="text-gray-600">
                Amount: <b>₹ {p.roomId?.monthlyRent}</b>
              </p>

              <p className="text-gray-600">
                Deposit: <b>₹ {p.roomId?.deposit}</b>
              </p>

              {/* PAYMENT ID */}
              <p className="text-sm text-gray-500 mt-2">
                Payment ID: {p.paymentId}
              </p>

              {/* ORDER ID */}
              <p className="text-sm text-gray-500">
                Order ID: {p.orderId}
              </p>

              {/* DATE */}
              <p className="text-sm text-gray-400 mt-2">
                {new Date(p.bookingDate).toLocaleString()}
              </p>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}