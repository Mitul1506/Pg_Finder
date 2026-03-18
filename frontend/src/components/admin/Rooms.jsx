import React, { useEffect, useState } from "react";
import axios from "axios";

const Rooms = () => {

  const [rooms,setRooms] = useState([])
  const [filteredRooms,setFilteredRooms] = useState([])
  const [search,setSearch] = useState("")
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    fetchRooms()

  },[])


  const fetchRooms = async ()=>{

    try{

      const res = await axios.get("http://localhost:3000/rooms")

      setRooms(res.data.data)
      setFilteredRooms(res.data.data)
      setLoading(false)

    }catch(err){

      console.log("Room Fetch Error",err)
      setLoading(false)

    }

  }


  const deleteRoom = async(id)=>{

    if(!window.confirm("Delete this room?")) return

    try{

      await axios.delete(`http://localhost:3000/rooms/${id}`)

      alert("Room deleted")

      fetchRooms()

    }catch(err){

      console.log("Delete Error",err)

    }

  }


  const handleSearch = (value)=>{

    setSearch(value)

    const filtered = rooms.filter((room)=>

      room.roomType?.toLowerCase().includes(value.toLowerCase()) ||
      room.pgId?.pgName?.toLowerCase().includes(value.toLowerCase())

    )

    setFilteredRooms(filtered)

  }



  return (

    <div className="ml-64 p-8 bg-gray-100 min-h-screen">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">
        Manage Rooms
      </h1>


      {/* Search */}
      <div className="mb-6">

        <input
          type="text"
          placeholder="Search Room..."
          value={search}
          onChange={(e)=>handleSearch(e.target.value)}
          className="border p-2 rounded w-80"
        />

      </div>


      {/* Rooms Table */}
      <div className="bg-white rounded-lg shadow p-6">

        {loading ? (

          <p>Loading Rooms...</p>

        ) : (

          <table className="w-full">

            <thead>

              <tr className="border-b text-left">
                <th className="py-3">PG Name</th>
                <th>Room Type</th>
                <th>Total Beds</th>
                <th>Available Beds</th>
                <th>Rent</th>
                <th>Deposit</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredRooms.map((room)=>(

                <tr key={room._id} className="border-b hover:bg-gray-50">

                  <td className="py-3">
                    {room.pgId?.pgName}
                  </td>

                  <td>
                    {room.roomType}
                  </td>

                  <td>
                    {room.totalBeds}
                  </td>

                  <td>
                    {room.availableBeds}
                  </td>

                  <td>
                    ₹ {room.monthlyRent}
                  </td>

                  <td>
                    ₹ {room.deposit}
                  </td>

                  <td>

                    <button
                      onClick={()=>deleteRoom(room._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

export default Rooms