import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PgList = () => {
  const navigate = useNavigate();

  // Dummy Data (Replace with API later)
  const [pgs] = useState([
    {
      id: 1,
      name: "Sunrise PG",
      city: "Ahmedabad",
      price: 6500,
      type: "Boys",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
    {
      id: 2,
      name: "Green Valley PG",
      city: "Ahmedabad",
      price: 7500,
      type: "Girls",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    },
    {
      id: 3,
      name: "Urban Stay PG",
      city: "Gandhinagar",
      price: 8500,
      type: "Co-Living",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    },
  ]);

  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Filter Logic
  const filteredPGs = pgs.filter((pg) => {
    return (
      pg.name.toLowerCase().includes(search.toLowerCase()) &&
      (cityFilter === "" || pg.city === cityFilter) &&
      (typeFilter === "" || pg.type === typeFilter)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Find Your Perfect PG
      </h1>

      {/* Search & Filters */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-8 grid md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search PG name..."
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        >
          <option value="">All Cities</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Gandhinagar">Gandhinagar</option>
        </select>

        <select
          className="border p-2 rounded-lg"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
          <option value="Co-Living">Co-Living</option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setCityFilter("");
            setTypeFilter("");
          }}
          className="bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Reset
        </button>
      </div>

      {/* PG Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPGs.length > 0 ? (
          filteredPGs.map((pg) => (
            <div
              key={pg.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={pg.image}
                alt={pg.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold">{pg.name}</h2>
                <p className="text-gray-600">{pg.city}</p>
                <p className="text-gray-800 font-bold mt-2">
                  ₹ {pg.price} / month
                </p>
                <span className="inline-block mt-2 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
                  {pg.type}
                </span>

                <button
                  onClick={() => navigate(`/pg/${pg.id}`)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No PG found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PgList;