import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-50">

      {/* HERO SECTION */}
      <section className="relative bg-white pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Find Your Perfect
              <span className="text-indigo-600"> PG Accommodation</span>
            </h1>

            <p className="text-gray-600 mt-6 text-lg">
              Safe, affordable and comfortable living spaces for students and professionals.
            </p>

            {/* SEARCH CARD */}
            <div className="mt-8 bg-white shadow-xl rounded-2xl p-6 border">

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
                  Search
                </button>

              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
              alt="pg room"
              className="rounded-2xl shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-14">
          Why Choose PG Finder?
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <div className="text-indigo-600 text-3xl mb-4">✔</div>
            <h3 className="text-xl font-semibold mb-3">Verified Listings</h3>
            <p className="text-gray-600">
              All PGs are verified for safety and reliability.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <div className="text-indigo-600 text-3xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-3">Affordable Prices</h3>
            <p className="text-gray-600">
              Compare and choose PGs that fit your budget.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <div className="text-indigo-600 text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
            <p className="text-gray-600">
              Book your PG instantly with simple steps.
            </p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-indigo-600 text-white py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Find Your PG?
        </h2>

        <p className="mb-8 text-lg opacity-90">
          Browse hundreds of verified PGs near you.
        </p>

        <button
          onClick={() => navigate("/pg-list")}
          className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Explore Now
        </button>
      </section>

    </div>
  );
};

export default Home;