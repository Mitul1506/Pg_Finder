import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function PgList(){

const [pgs,setPgs] = useState([])
const [search,setSearch] = useState("")
const navigate = useNavigate()

// GET ALL PGS
const getPgs = async()=>{

try{

const res = await axios.get("http://localhost:3000/pgs")

setPgs(res.data.data || [])

}catch(err){

toast.error("Failed to load PGs")

}

}

useEffect(()=>{
getPgs()
},[])


// SEARCH FILTER
const filteredPgs = pgs.filter((pg)=>{

const name = pg.pgName?.toLowerCase() || ""
const area = pg.address?.area?.toLowerCase() || ""
const city = pg.address?.city?.toLowerCase() || ""

return (
name.includes(search.toLowerCase()) ||
area.includes(search.toLowerCase()) ||
city.includes(search.toLowerCase())
)

})


return(

<div className="pt-24 px-10 bg-gray-100 min-h-screen">

{/* TITLE */}
<h1 className="text-3xl font-bold text-center mb-8">
Find Your Perfect PG
</h1>


{/* SEARCH BAR */}
<div className="flex justify-center mb-10">

<input
type="text"
placeholder="Search by PG name, area, or city..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

</div>


{/* NO RESULTS */}
{filteredPgs.length === 0 ? (

<div className="text-center text-gray-500 text-lg">
No PGs found
</div>

) : (

<div className="grid md:grid-cols-3 gap-8">

{filteredPgs.map((pg)=>(

<div
key={pg._id}
className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
>

{/* IMAGE */}
<img
src={pg.photos?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"}
alt="pg"
className="h-48 w-full object-cover"
/>

<div className="p-5">

{/* NAME + VERIFIED */}
<div className="flex justify-between items-center">

<h2 className="text-xl font-semibold">
{pg.pgName}
</h2>

{pg.verificationBadge && (
<span className="text-green-600 text-sm font-semibold">
✔ Verified
</span>
)}

</div>


{/* TYPE */}
<p className="text-gray-600 text-sm mt-1">
Type: {pg.pgType}
</p>


{/* LOCATION */}
<p className="text-gray-600 text-sm mt-1">
{pg.address?.area}, {pg.address?.city}
</p>


{/* PRICE */}
<p className="text-indigo-600 font-bold mt-2">
₹{pg.priceRange?.min} - ₹{pg.priceRange?.max} / month
</p>


{/* AMENITIES */}
<div className="flex flex-wrap gap-2 mt-3">

{pg.amenities?.slice(0,4).map((a,index)=>(
<span
key={index}
className="bg-gray-200 text-xs px-2 py-1 rounded"
>
{a}
</span>
))}

</div>


{/* BUTTON */}
<button
onClick={()=>navigate(`/RoomList/${pg._id}`)}
className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
>
View Rooms
</button>

</div>

</div>

))}

</div>

)}

</div>

)

}