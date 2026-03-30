import React, { useEffect, useState } from "react";
import axios from "axios";

const Rooms = () => {

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:3000/rooms");

      setRooms(res.data.data);
      setFilteredRooms(res.data.data);
      setLoading(false);

    } catch (err) {
      console.log("Room Fetch Error", err);
      setLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    if (!window.confirm("Delete this room?")) return;

    try {
      await axios.delete(`http://localhost:3000/rooms/${id}`);
      fetchRooms();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);

    const filtered = rooms.filter((room) =>
      room.roomType?.toLowerCase().includes(value.toLowerCase()) ||
      room.pgId?.pgName?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredRooms(filtered);
  };

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Manage Rooms
        </h1>
        <p className="text-gray-500">
          View and manage all room listings
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by room type or PG..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="border p-3 rounded-lg w-80 focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-md border overflow-hidden">

        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading Rooms...
          </div>
        ) : (

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* HEADER */}
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">PG Name</th>
                  <th className="px-6 py-4 text-left">Room Type</th>
                  <th className="px-6 py-4 text-left">Total Beds</th>
                  <th className="px-6 py-4 text-left">Available</th>
                  <th className="px-6 py-4 text-left">Rent</th>
                  <th className="px-6 py-4 text-left">Deposit</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y">

                {filteredRooms.map((room) => (

                  <tr key={room._id} className="hover:bg-gray-50">

                    {/* PG NAME */}
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {room.pgId?.pgName}
                    </td>

                    {/* ROOM TYPE */}
                    <td className="px-6 py-4 text-gray-600">
                      {room.roomType}
                    </td>

                    {/* TOTAL BEDS */}
                    <td className="px-6 py-4 text-gray-600">
                      {room.totalBeds}
                    </td>

                    {/* AVAILABLE */}
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${room.availableBeds > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"}`}
                      >
                        {room.availableBeds}
                      </span>
                    </td>

                    {/* RENT */}
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      ₹ {room.monthlyRent}
                    </td>

                    {/* DEPOSIT */}
                    <td className="px-6 py-4 text-gray-600">
                      ₹ {room.deposit}
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteRoom(room._id)}
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

export default Rooms;