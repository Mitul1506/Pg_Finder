import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminDisputes() {

  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
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

  // ================= UPDATE =================
  const updateDispute = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/disputes/${id}`, updatedData);
      toast.success("Dispute updated ✅");
      fetchDisputes();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleStatusChange = (id, status) => {
    updateDispute(id, { status });
  };

  const handleRemarksChange = (id, remarks) => {
    updateDispute(id, { adminRemarks: remarks });
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="w-full text-center py-20 text-gray-500 text-lg">
        Loading disputes...
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Manage Disputes ⚠️
        </h1>
        <p className="text-gray-500">
          Handle user complaints and resolve issues
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-md border overflow-hidden">

        {disputes.length === 0 ? (

          <div className="p-6 text-center text-gray-500">
            No disputes found
          </div>

        ) : (

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* HEADER */}
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Against</th>
                  <th className="px-6 py-4 text-left">Issue</th>
                  <th className="px-6 py-4 text-left">Description</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Remarks</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y">

                {disputes.map((d) => (

                  <tr key={d._id} className="hover:bg-gray-50">

                    {/* USER */}
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {d.raisedBy?.firstName || "User"}
                    </td>

                    {/* AGAINST */}
                    <td className="px-6 py-4 text-gray-600">
                      {d.againstUserId?.firstName || "Landlord"}
                    </td>

                    {/* ISSUE */}
                    <td className="px-6 py-4 text-gray-600">
                      {d.issueType}
                    </td>

                    {/* DESCRIPTION */}
                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate">
                      {d.description}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <select
                        value={d.status}
                        onChange={(e) =>
                          handleStatusChange(d._id, e.target.value)
                        }
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    {/* REMARKS */}
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        defaultValue={d.adminRemarks}
                        onBlur={(e) =>
                          handleRemarksChange(d._id, e.target.value)
                        }
                        placeholder="Add remarks"
                        className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
                      />
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4 text-right">

                      <button
                        onClick={() =>
                          updateDispute(d._id, {
                            status: "resolved",
                            adminRemarks: "Issue resolved"
                          })
                        }
                        className="bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600"
                      >
                        Resolve
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
}