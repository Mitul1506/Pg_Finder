import React, { useEffect, useState } from "react";
import axios from "axios";

const Pgs = () => {

  const [pgs,setPgs] = useState([])
  const [filteredPgs,setFilteredPgs] = useState([])
  const [search,setSearch] = useState("")
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    fetchPgs()

  },[])


  const fetchPgs = async ()=>{

    try{

      const res = await axios.get("http://localhost:3000/pgs")

      setPgs(res.data.data)
      setFilteredPgs(res.data.data)
      setLoading(false)

    }catch(err){

      console.log("PG Fetch Error",err)
      setLoading(false)

    }

  }


  const deletePg = async(id)=>{

    if(!window.confirm("Delete this PG?")) return

    try{

      await axios.delete(`http://localhost:3000/pgs/${id}`)

      alert("PG deleted")

      fetchPgs()

    }catch(err){

      console.log("Delete Error",err)

    }

  }


  const approvePg = async(id)=>{

    try{

      await axios.put(`http://localhost:3000/pgs/${id}`,{
        status:"approved"
      })

      alert("PG Approved")

      fetchPgs()

    }catch(err){

      console.log("Approve Error",err)

    }

  }


  const rejectPg = async(id)=>{

    try{

      await axios.put(`http://localhost:3000/pgs/${id}`,{
        status:"rejected"
      })

      alert("PG Rejected")

      fetchPgs()

    }catch(err){

      console.log("Reject Error",err)

    }

  }


  const handleSearch = (value)=>{

    setSearch(value)

    const filtered = pgs.filter((pg)=>

      pg.name?.toLowerCase().includes(value.toLowerCase()) ||
      pg.address?.city?.toLowerCase().includes(value.toLowerCase()) ||
      pg.address?.area?.toLowerCase().includes(value.toLowerCase())

    )

    setFilteredPgs(filtered)

  }



  return (

    <div className="ml-64 p-8 bg-gray-100 min-h-screen">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">
        Manage PGs
      </h1>


      {/* Search */}
      <div className="mb-6">

        <input
          type="text"
          placeholder="Search PG..."
          value={search}
          onChange={(e)=>handleSearch(e.target.value)}
          className="border p-2 rounded w-80"
        />

      </div>


      {/* PG Table */}
      <div className="bg-white rounded-lg shadow p-6">

        {loading ? (

          <p>Loading PGs...</p>

        ) : (

          <table className="w-full">

            <thead>

              <tr className="border-b text-left">
                <th className="py-3">PG Name</th>
                <th>City</th>
                <th>Area</th>
                <th>Pincode</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredPgs.map((pg)=>(

                <tr key={pg._id} className="border-b hover:bg-gray-50">

                  <td className="py-3">
                    {pg.pgName}
                  </td>

                  <td>
                    {pg.address?.city}
                  </td>

                  <td>
                    {pg.address?.area}
                  </td>

                  <td>
                    {pg.address?.pincode}
                  </td>

                  <td>

                    <span className={`px-3 py-1 rounded text-sm
                      ${pg.status === "approved" ? "bg-green-100 text-green-700" :
                        pg.status === "rejected" ? "bg-red-100 text-red-600" :
                        "bg-yellow-100 text-yellow-700"}`}
                    >
                      {pg.status || "pending"}
                    </span>

                  </td>

                  <td className="space-x-2">

                    <button
                      onClick={()=>approvePg(pg._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>

                    <button
                      onClick={()=>rejectPg(pg._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Reject
                    </button>

                    <button
                      onClick={()=>deletePg(pg._id)}
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

export default Pgs