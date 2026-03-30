import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/users");
      setUsers(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching users", err);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:3000/user/${id}`);
      fetchUsers();
    } catch (err) {
      console.log("Delete error", err);
    }
  };

  // 👤 Get initials
  const getInitials = (user) => {
    const f = user.firstName?.charAt(0).toUpperCase() || "";
    const l = user.lastName?.charAt(0).toUpperCase() || "";
    return f + l;
  };

  return (
  <div className="w-full">

    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Manage Users
      </h1>
      <p className="text-gray-500 mt-1">
        View and manage all registered users
      </p>
    </div>

    {/* Table */}
    <div className="bg-white rounded-2xl shadow-md border overflow-hidden">

      {loading ? (
        <div className="p-6 text-center text-gray-500">
          Loading users...
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

              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">

                  <td className="px-6 py-4 flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                      {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </div>

                    <span className="font-medium text-gray-800">
                      {user.firstName} {user.lastName}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs
                      ${user.role === "admin" ? "bg-red-100 text-red-600" :
                        user.role === "landlord" ? "bg-yellow-100 text-yellow-700" :
                        "bg-blue-100 text-blue-600"}`}>
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteUser(user._id)}
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
export default Users;