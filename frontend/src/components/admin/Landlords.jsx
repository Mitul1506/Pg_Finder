import React, { useEffect, useState } from "react";
import axios from "axios";

const Landlords = () => {

  const [landlords,setLandlords] = useState([])
  const [filteredLandlords,setFilteredLandlords] = useState([])
  const [search,setSearch] = useState("")
  const [loading,setLoading] = useState(true)

  // NEW STATE FOR ADD FORM
  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })

  useEffect(()=>{
    fetchLandlords()
  },[])

  // ================= FETCH =================
  const fetchLandlords = async ()=>{
    try{
      const res = await axios.get("http://localhost:3000/user/users")

      const landlordUsers = res.data.data.filter(
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

  // ================= ADD LANDLORD =================
  const handleAddLandlord = async(e)=>{
    e.preventDefault()

    try{

      await axios.post("http://localhost:3000/user/register",{
        ...formData,
        role:"landlord" // IMPORTANT
      })

      alert("Landlord added successfully ✅")

      setFormData({
        firstName:"",
        lastName:"",
        email:"",
        password:""
      })

      fetchLandlords()

    }catch(err){
      console.log(err)
      alert("Error adding landlord")
    }
  }

  // ================= DELETE =================
  const deleteLandlord = async(id)=>{
    if(!window.confirm("Delete this landlord?")) return

    try{
      await axios.delete(`http://localhost:3000/user/${id}`)
      alert("Landlord deleted ❌")
      fetchLandlords()
    }catch(err){
      console.log("Delete error",err)
    }
  }

  // ================= SEARCH =================
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

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8">
        Manage Landlords
      </h1>

      {/* ================= ADD FORM ================= */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-xl font-semibold mb-4 text-indigo-600">
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
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e)=>setFormData({...formData,lastName:e.target.value})}
            className="border p-2 rounded"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            className="border p-2 rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e)=>setFormData({...formData,password:e.target.value})}
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="col-span-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
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
          className="border p-2 rounded w-80"
        />
      </div>

      {/* ================= TABLE ================= */}
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

                  <td>{landlord.email}</td>

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