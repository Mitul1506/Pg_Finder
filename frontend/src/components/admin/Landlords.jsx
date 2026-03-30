import React, { useEffect, useState } from "react";
import axios from "axios";

const Landlords = () => {

  const [landlords, setLandlords] = useState([]);
  const [filteredLandlords, setFilteredLandlords] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    fetchLandlords();
  }, []);

  // ================= FETCH =================
  const fetchLandlords = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/users");

      const landlordUsers = res.data.data.filter(
        (user) => user.role === "landlord"
      );

      setLandlords(landlordUsers);
      setFilteredLandlords(landlordUsers);
      setLoading(false);

    } catch (err) {
      console.log("Error fetching landlords", err);
      setLoading(false);
    }
  };

  // ================= ADD =================
  const handleAddLandlord = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/user/register", {
        ...formData,
        role: "landlord"
      });

      alert("Landlord added ✅");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      });

      fetchLandlords();

    } catch (err) {
      console.log(err);
      alert("Error adding landlord");
    }
  };

  // ================= DELETE =================
  const deleteLandlord = async (id) => {
    if (!window.confirm("Delete this landlord?")) return;

    try {
      await axios.delete(`http://localhost:3000/user/${id}`);
      fetchLandlords();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= SEARCH =================
  const handleSearch = (value) => {
    setSearch(value);

    const filtered = landlords.filter((l) =>
      l.firstName.toLowerCase().includes(value.toLowerCase()) ||
      l.email.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredLandlords(filtered);
  };

  // 👤 initials
  const getInitials = (u) => {
    return (
      (u.firstName?.charAt(0) || "") +
      (u.lastName?.charAt(0) || "")
    ).toUpperCase();
  };

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Manage Landlords
        </h1>
        <p className="text-gray-500">
          Add, search and manage landlords
        </p>
      </div>

      {/* ================= ADD FORM ================= */}
      <div className="bg-white p-6 rounded-2xl shadow-md border mb-8">

        <h2 className="text-lg font-semibold mb-4 text-indigo-600">
          ➕ Add New Landlord
        </h2>

        <form
          onSubmit={handleAddLandlord}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e)=>setFormData({...formData,firstName:e.target.value})}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e)=>setFormData({...formData,lastName:e.target.value})}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e)=>setFormData({...formData,password:e.target.value})}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
            required
          />

          <button
            type="submit"
            className="col-span-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Landlord 🚀
          </button>

        </form>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search landlord..."
          value={search}
          onChange={(e)=>handleSearch(e.target.value)}
          className="border p-3 rounded-lg w-80 focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl shadow-md border overflow-hidden">

        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading landlords...
          </div>
        ) : (

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">

                {filteredLandlords.map((l) => (

                  <tr key={l._id} className="hover:bg-gray-50">

                    {/* USER */}
                    <td className="px-6 py-4 flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                        {getInitials(l)}
                      </div>

                      <span className="font-medium text-gray-800">
                        {l.firstName} {l.lastName}
                      </span>

                    </td>

                    {/* EMAIL */}
                    <td className="px-6 py-4 text-gray-600">
                      {l.email}
                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-4">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                        landlord
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={()=>deleteLandlord(l._id)}
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

export default Landlords;