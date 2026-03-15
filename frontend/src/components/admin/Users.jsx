import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {

  const [users,setUsers] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    fetchUsers()

  },[])


  const fetchUsers = async () => {

    try{

      const res = await axios.get("http://localhost:3000/user/users")

      setUsers(res.data.data)
      setLoading(false)

    }catch(err){

      console.log("Error fetching users",err)
      setLoading(false)

    }

  }


  const deleteUser = async(id) => {

    if(!window.confirm("Are you sure you want to delete this user?")) return

    try{

      await axios.delete(`http://localhost:3000/user/${id}`)

      alert("User deleted")

      fetchUsers()

    }catch(err){

      console.log("Delete error",err)

    }

  }



  return (

    <div className="ml-64 p-8 bg-gray-100 min-h-screen">

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8">
        Manage Users
      </h1>



      {/* Users Table */}
      <div className="bg-white rounded-lg shadow p-6">

        {loading ? (

          <p>Loading users...</p>

        ) : (

          <table className="w-full">

            <thead>

              <tr className="border-b text-left">
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {users.map((user)=>(

                <tr key={user._id} className="border-b hover:bg-gray-50">

                  <td className="py-3">
                    {user.firstName} {user.lastName}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>

                    <span className={`px-3 py-1 rounded text-sm
                      ${user.role === "admin" ? "bg-red-100 text-red-600" :
                        user.role === "landlord" ? "bg-yellow-100 text-yellow-700" :
                        "bg-blue-100 text-blue-600"}`}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td>

                    <button
                      onClick={()=>deleteUser(user._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  )

}

export default Users