import React, { useEffect, useState } from "react";
import axios from "axios";

const Landlords = () => {

  const [landlords,setLandlords] = useState([])
  const [filteredLandlords,setFilteredLandlords] = useState([])
  const [search,setSearch] = useState("")
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    fetchLandlords()

  },[])


  const fetchLandlords = async ()=>{

    try{

      const res = await axios.get("http://localhost:3000/user/users")

      const allUsers = res.data.data

      const landlordUsers = allUsers.filter(
        (user)=> user.role === "landlord"
      )

      setLandlords(landlordUsers)
      setFilteredLandlords(landlordUsers)
      setLoading(false)

    }catch(err){

      console.log("Error fetching landlords",err)
      setLoading(false)

    }

  }


  const deleteLandlord = async(id)=>{

    if(!window.confirm("Delete this landlord?")) return

    try{

      await axios.delete(`http://localhost:3000/user/${id}`)

      alert("Landlord deleted")

      fetchLandlords()

    }catch(err){

      console.log("Delete error",err)

    }

  }


  const handleSearch = (value)=>{

    setSearch(value)

    const filtered = landlords.filter((landlord)=>

      landlord.firstName.toLowerCase().includes(value.toLowerCase()) ||
      landlord.email.toLowerCase().includes(value.toLowerCase())

    )

    setFilteredLandlords(filtered)

  }


  return (

    <div className="ml-64 p-8 bg-gray-100 min-h-screen">

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8">
        Manage Landlords
      </h1>


      {/* Search Bar */}
      <div className="mb-6">

        <input
          type="text"
          placeholder="Search landlord..."
          value={search}
          onChange={(e)=>handleSearch(e.target.value)}
          className="border p-2 rounded w-80"
        />

      </div>


      {/* Landlords Table */}
      <div className="bg-white rounded-lg shadow p-6">

        {loading ? (

          <p>Loading landlords...</p>

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

              {filteredLandlords.map((landlord)=>(

                <tr key={landlord._id} className="border-b hover:bg-gray-50">

                  <td className="py-3">
                    {landlord.firstName} {landlord.lastName}
                  </td>

                  <td>
                    {landlord.email}
                  </td>

                  <td>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm">
                      {landlord.role}
                    </span>
                  </td>

                  <td>

                    <button
                      onClick={()=>deleteLandlord(landlord._id)}
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

export default Landlords