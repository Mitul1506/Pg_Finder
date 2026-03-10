import axios from "axios";
import React, { useEffect, useState } from "react";

const GetApiDemo = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = "https://node5.onrender.com/user/user";

  // 🔹 Fetch Users
  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/`);
      setUsers(res.data?.data || []);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DELETE USER FUNCTION
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/${id}`);

      // 🔹 Remove user from UI instantly
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.log(err);
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        GET API Demo (Tailwind Table)
      </h1>

      {loading && (
        <p className="text-center text-blue-500 font-semibold">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 font-semibold">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Age</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th> {/* NEW */}
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-2 px-4 text-sm">
                      {user._id.slice(-6)}
                    </td>
                    <td className="py-2 px-4">
                      {user.name || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {user.email || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {user.age || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {user.isActive ? (
                        <span className="text-green-600 font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* 🔥 DELETE BUTTON */}
                    <td className="py-2 px-4">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 text-gray-500"
                  >
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetApiDemo;