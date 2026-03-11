import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-50">

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Find Your Perfect
              <span className="block text-yellow-300">
                PG Accommodation
              </span>
            </h1>

            <p className="mt-6 text-lg opacity-90 max-w-xl">
              Discover safe, affordable and comfortable PGs for students and
              professionals across India.
            </p>

            {/* SEARCH CARD */}
            <div className="mt-10 bg-white text-gray-800 shadow-2xl rounded-2xl p-6">

              <div className="grid md:grid-cols-3 gap-4">

                <input
                  type="text"
                  placeholder="Enter City"
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <select className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Gender</option>
                  <option>Boys</option>
                  <option>Girls</option>
                </select>

                <button
                  onClick={() => navigate("/pg-list")}
                  className="bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 transition"
                >
                  Search PG
                </button>

              </div>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
              alt="pg room"
              className="rounded-3xl shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          Why Choose PG Finder?
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="text-indigo-600 text-4xl mb-4">✔</div>
            <h3 className="text-xl font-semibold mb-3">
              Verified Listings
            </h3>
            <p className="text-gray-600">
              All PG accommodations are verified for safety,
              comfort and reliability.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="text-indigo-600 text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-3">
              Affordable Prices
            </h3>
            <p className="text-gray-600">
              Compare hundreds of PGs and choose the best
              option that fits your budget.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="text-indigo-600 text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3">
              Easy Booking
            </h3>
            <p className="text-gray-600">
              Book your PG quickly with a simple and
              user-friendly process.
            </p>
          </div>

        </div>
      </section>

      {/* POPULAR CITIES */}
      <section className="bg-white py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-14">
          Popular PG Cities
        </h2>

        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8">

          {["Ahmedabad", "Delhi", "Bangalore", "Pune"].map((city, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl p-10 text-center font-semibold text-lg hover:bg-indigo-600 hover:text-white transition cursor-pointer"
            >
              {city}
            </div>
          ))}

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-indigo-600 text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Find Your PG?
        </h2>

        <p className="mb-8 text-lg opacity-90">
          Browse hundreds of verified PG accommodations near you.
        </p>

        <button
          onClick={() => navigate("/pg-list")}
          className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Explore PGs
        </button>
      </section>

    </div>
  );
};

export default Home;