import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminDisputes() {

  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH DISPUTES =================
  const fetchDisputes = async () => {
    try {

      const res = await axios.get("http://localhost:3000/disputes");

      setDisputes(res.data.data);

    } catch (err) {
      toast.error("Failed to load disputes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  // ================= UPDATE STATUS =================
  const updateDispute = async (id, updatedData) => {
    try {

      await axios.put(`http://localhost:3000/disputes/${id}`, updatedData);

      toast.success("Dispute updated ✅");

      fetchDisputes();

    } catch (err) {
      toast.error("Update failed");
    }
  };

  // ================= HANDLE CHANGE =================
  const handleStatusChange = (id, status) => {
    updateDispute(id, { status });
  };

  const handleRemarksChange = (id, remarks) => {
    updateDispute(id, { adminRemarks: remarks });
  };

  // ================= LOADING =================
  if (loading) {
    return <h2 className="text-center mt-20 text-xl">Loading disputes...</h2>;
  }

  return (
    <div className="ml-64 p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Manage Disputes ⚠️
      </h1>

      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

        {disputes.length === 0 ? (

          <p className="text-center text-gray-600">
            No disputes found
          </p>

        ) : (

          <table className="w-full">

            <thead>
              <tr className="border-b text-left bg-gray-50">
                <th className="p-3">User</th>
                <th className="p-3">Against</th>
                <th className="p-3">Issue</th>
                <th className="p-3">Description</th>
                <th className="p-3">Status</th>
                <th className="p-3">Admin Remarks</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {disputes.map((d) => (

                <tr key={d._id} className="border-b hover:bg-gray-50">

                  {/* USER */}
                  <td className="p-3">
                    {d.raisedBy?.firstName || "User"}
                  </td>

                  {/* LANDLORD */}
                  <td className="p-3">
                    {d.againstUserId?.firstName || "Landlord"}
                  </td>

                  {/* ISSUE TYPE */}
                  <td className="p-3">
                    {d.issueType}
                  </td>

                  {/* DESCRIPTION */}
                  <td className="p-3 max-w-[200px] truncate">
                    {d.description}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <select
                      value={d.status}
                      onChange={(e) =>
                        handleStatusChange(d._id, e.target.value)
                      }
                      className="border p-1 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>

                  {/* ADMIN REMARKS */}
                  <td className="p-3">
                    <input
                      type="text"
                      defaultValue={d.adminRemarks}
                      onBlur={(e) =>
                        handleRemarksChange(d._id, e.target.value)
                      }
                      placeholder="Add remarks"
                      className="border p-1 rounded w-full"
                    />
                  </td>

                  {/* ACTION */}
                  <td className="p-3">
                    <button
                      onClick={() =>
                        updateDispute(d._id, {
                          status: "resolved",
                          adminRemarks: "Issue resolved"
                        })
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Resolve
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}