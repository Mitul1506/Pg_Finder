import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {

  const [users,setUsers] = useState(0)
  const [pgs,setPgs] = useState(0)
  const [rooms,setRooms] = useState(0)
  const [bookings,setBookings] = useState(0)

  const [recentUsers,setRecentUsers] = useState([])

  useEffect(()=>{

    fetchDashboardData()

  },[])


  const fetchDashboardData = async ()=>{

    try{

      const userRes = await axios.get("http://localhost:3000/user/users")
      setUsers(userRes.data.data.length)
      setRecentUsers(userRes.data.data.slice(-5))

      const pgRes = await axios.get("http://localhost:3000/pgs")
      setPgs(pgRes.data.data.length)

      const roomRes = await axios.get("http://localhost:3000/rooms")
      setRooms(roomRes.data.data.length)

      const bookingRes = await axios.get("http://localhost:3000/bookings")
      setBookings(bookingRes.data.data.length)

    }catch(err){

      console.log("Dashboard Error",err)

    }

  }


  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>


      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-3xl font-bold">{users}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Total PGs</h2>
          <p className="text-3xl font-bold">{pgs}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Total Rooms</h2>
          <p className="text-3xl font-bold">{rooms}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Total Bookings</h2>
          <p className="text-3xl font-bold">{bookings}</p>
        </div>

      </div>


      {/* Recent Users */}
      <div className="bg-white p-6 rounded-lg shadow">

        <h2 className="text-xl font-semibold mb-4">
          Recent Users
        </h2>

        <table className="w-full">

          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>

            {recentUsers.map((user)=>(

              <tr key={user._id} className="border-b">

                <td className="py-2">
                  {user.firstName} {user.lastName}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Dashboard