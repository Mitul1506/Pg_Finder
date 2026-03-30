import React, { useEffect, useState } from "react";
import axios from "axios";

const Pgs = () => {

  const [pgs, setPgs] = useState([]);
  const [filteredPgs, setFilteredPgs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPgs();
  }, []);

  const fetchPgs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/pgs");

      setPgs(res.data.data);
      setFilteredPgs(res.data.data);
      setLoading(false);

    } catch (err) {
      console.log("PG Fetch Error", err);
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const deletePg = async (id) => {
    if (!window.confirm("Delete this PG?")) return;

    try {
      await axios.delete(`http://localhost:3000/pgs/${id}`);

      const updated = pgs.filter(pg => pg._id !== id);
      setPgs(updated);
      setFilteredPgs(updated);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= SEARCH =================
  const handleSearch = (value) => {
    setSearch(value);

    const filtered = pgs.filter((pg) =>
      pg.pgName?.toLowerCase().includes(value.toLowerCase()) ||
      pg.address?.city?.toLowerCase().includes(value.toLowerCase()) ||
      pg.address?.area?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredPgs(filtered);
  };

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Manage PGs
        </h1>
        <p className="text-gray-500">
          View and manage all PG listings
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search PG by name, city or area..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="border p-3 rounded-lg w-80 focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-md border overflow-hidden">

        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading PGs...
          </div>
        ) : filteredPgs.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No PGs found
          </div>
        ) : (

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* HEADER */}
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">PG</th>
                  <th className="px-6 py-4 text-left">City</th>
                  <th className="px-6 py-4 text-left">Area</th>
                  <th className="px-6 py-4 text-left">Pincode</th>
                  <th className="px-6 py-4 text-left">Image</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y">

                {filteredPgs.map((pg) => (

                  <tr key={pg._id} className="hover:bg-gray-50">

                    {/* PG NAME */}
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {pg.pgName}
                    </td>

                    {/* CITY */}
                    <td className="px-6 py-4 text-gray-600">
                      {pg.address?.city}
                    </td>

                    {/* AREA */}
                    <td className="px-6 py-4 text-gray-600">
                      {pg.address?.area}
                    </td>

                    {/* PINCODE */}
                    <td className="px-6 py-4 text-gray-600">
                      {pg.address?.pincode}
                    </td>

                    {/* IMAGE */}
                    <td className="px-6 py-4">
                      {pg.photos?.length > 0 ? (
                        <img
                          src={pg.photos[0]}
                          alt="pg"
                          className="w-16 h-12 object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">
                          No Image
                        </span>
                      )}
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deletePg(pg._id)}
                        className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          </div>

        )}

      </div>

    </div>
  );
};

export default Pgs;