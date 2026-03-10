import React, { useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      pgName: "Sunrise PG",
      city: "Ahmedabad",
      price: 6500,
      date: "2026-02-20",
      status: "Confirmed",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
    {
      id: 2,
      pgName: "Green Valley PG",
      city: "Gandhinagar",
      price: 7500,
      date: "2026-02-18",
      status: "Confirmed",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    },
  ]);

  const cancelBooking = (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) return;

    setBookings(
      bookings.map((booking) =>
        booking.id === id
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          You have no bookings yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={booking.image}
                alt={booking.pgName}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold">
                  {booking.pgName}
                </h2>
                <p className="text-gray-600">{booking.city}</p>

                <p className="mt-2 font-bold">
                  ₹ {booking.price} / month
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Booking Date: {booking.date}
                </p>

                <p
                  className={`mt-2 font-semibold ${
                    booking.status === "Confirmed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {booking.status}
                </p>

                {booking.status === "Confirmed" && (
                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;