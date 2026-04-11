import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MapPinIcon,
  CurrencyRupeeIcon,
  WifiIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  TrashIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

export default function ComparePGs() {
  const [compareList, setCompareList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCompareList();
    // Listen for updates
    window.addEventListener("compareUpdated", loadCompareList);
    return () => window.removeEventListener("compareUpdated", loadCompareList);
  }, []);

  const loadCompareList = () => {
    const saved = localStorage.getItem("comparePGs");
    setCompareList(saved ? JSON.parse(saved) : []);
  };

  const removeFromCompare = (pgId) => {
    const updated = compareList.filter((pg) => pg._id !== pgId);
    setCompareList(updated);
    localStorage.setItem("comparePGs", JSON.stringify(updated));
    window.dispatchEvent(new Event("compareUpdated"));
    toast.info("Removed from comparison");
  };

  const clearAll = () => {
    setCompareList([]);
    localStorage.removeItem("comparePGs");
    window.dispatchEvent(new Event("compareUpdated"));
    toast.info("Comparison list cleared");
  };

  const getAllAmenities = () => {
    const amenitiesSet = new Set();
    compareList.forEach((pg) => {
      pg.amenities?.forEach((amenity) => amenitiesSet.add(amenity));
    });
    return Array.from(amenitiesSet);
  };

  const getPriceComparison = (minPrice) => {
    const allPrices = compareList.map(pg => pg.priceRange?.min || 0);
    const minOverall = Math.min(...allPrices);
    const maxOverall = Math.max(...allPrices);
    
    if (minPrice === minOverall) return { text: "Best Price", color: "text-green-600", bg: "bg-green-100" };
    if (minPrice === maxOverall) return { text: "Highest", color: "text-red-600", bg: "bg-red-100" };
    return { text: "Average", color: "text-yellow-600", bg: "bg-yellow-100" };
  };

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white pt-24 pb-16">
          <div className="relative max-w-7xl mx-auto px-6">
            <button
              onClick={() => navigate(-1)}
              className="mb-4 flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Compare PGs</h1>
            <p className="text-white/90 text-lg">Compare PGs side by side</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <BuildingOfficeIcon className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No PGs to Compare</h3>
            <p className="text-gray-500 mb-6">Add PGs from the PG list page to see a side-by-side comparison</p>
            <button
              onClick={() => navigate("/pg-list")}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Browse PGs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white pt-24 pb-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back
          </button>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Compare PGs</h1>
              <p className="text-white/90 text-lg">Compare {compareList.length} PG(s) side by side</p>
            </div>
            <button
              onClick={clearAll}
              className="flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-5 py-3 rounded-xl hover:bg-red-500/30 transition-all"
            >
              <TrashIcon className="h-5 w-5" />
              Clear All
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-sm border border-gray-100">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-left text-gray-600 font-semibold w-48 bg-gray-50">Features</th>
                {compareList.map((pg) => (
                  <th key={pg._id} className="p-4 text-center min-w-[280px] relative">
                    <button
                      onClick={() => removeFromCompare(pg._id)}
                      className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <div className="mb-3">
                      <img
                        src={pg.photos?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"}
                        alt={pg.pgName}
                        className="h-40 w-full object-cover rounded-xl"
                      />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">{pg.pgName}</h3>
                    {pg.verificationBadge && (
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <ShieldCheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-600">Verified</span>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Price Row */}
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <CurrencyRupeeIcon className="h-5 w-5 text-indigo-600" />
                    Price Range
                  </div>
                </td>
                {compareList.map((pg) => {
                  const priceCompare = getPriceComparison(pg.priceRange?.min);
                  return (
                    <td key={pg._id} className="p-4 text-center">
                      <div className={`font-bold text-lg ${priceCompare.color}`}>
                        ₹{pg.priceRange?.min} - ₹{pg.priceRange?.max}
                      </div>
                      <span className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${priceCompare.bg} ${priceCompare.color}`}>
                        {priceCompare.text}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Location Row */}
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-5 w-5 text-indigo-600" />
                    Location
                  </div>
                </td>
                {compareList.map((pg) => (
                  <td key={pg._id} className="p-4 text-center">
                    <div className="text-gray-800 font-medium">{pg.address?.area}</div>
                    <div className="text-sm text-gray-500">{pg.address?.city}, {pg.address?.state}</div>
                    <div className="text-xs text-gray-400">{pg.address?.pincode}</div>
                  </td>
                ))}
              </tr>

              {/* Rating Row */}
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <StarIcon className="h-5 w-5 text-indigo-600" />
                    Rating
                  </div>
                </td>
                {compareList.map((pg) => (
                  <td key={pg._id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <StarSolidIcon className="h-5 w-5 text-yellow-400" />
                      <span className="font-semibold text-gray-800">{pg.rating || "4.5"}</span>
                      <span className="text-gray-400 text-sm">/5</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Total Rooms Row */}
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <HomeIcon className="h-5 w-5 text-indigo-600" />
                    Total Rooms
                  </div>
                </td>
                {compareList.map((pg) => (
                  <td key={pg._id} className="p-4 text-center">
                    <span className="font-semibold text-gray-800">{pg.totalRooms || "N/A"}</span>
                  </td>
                ))}
              </tr>

              {/* Amenities Row */}
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <WifiIcon className="h-5 w-5 text-indigo-600" />
                    Amenities
                  </div>
                </td>
                {compareList.map((pg) => (
                  <td key={pg._id} className="p-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {getAllAmenities().map((amenity, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded-full ${
                            pg.amenities?.includes(amenity)
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700 line-through"
                          }`}
                        >
                          {pg.amenities?.includes(amenity) ? "✓" : "✗"} {amenity}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Rules Row */}
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="h-5 w-5 text-indigo-600" />
                    Rules
                  </div>
                </td>
                {compareList.map((pg) => (
                  <td key={pg._id} className="p-4">
                    <div className="space-y-1">
                      {pg.rules?.slice(0, 4).map((rule, idx) => (
                        <div key={idx} className="text-sm text-gray-600">• {rule}</div>
                      ))}
                      {pg.rules?.length > 4 && (
                        <div className="text-xs text-gray-400">+{pg.rules.length - 4} more</div>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Action Buttons Row */}
              <tr className="hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-700 bg-gray-50">Actions</td>
                {compareList.map((pg) => (
                  <td key={pg._id} className="p-4 text-center">
                    <button
                      onClick={() => navigate(`/RoomList/${pg._id}`)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all font-medium"
                    >
                      View Rooms
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recommendation Section */}
        {compareList.length > 1 && (
          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Recommendation</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Best Budget:</span>{" "}
                  {compareList.reduce((best, pg) => 
                    (pg.priceRange?.min || 0) < (best.priceRange?.min || Infinity) ? pg : best
                  ).pgName}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">Most Amenities:</span>{" "}
                  {compareList.reduce((best, pg) => 
                    (pg.amenities?.length || 0) > (best.amenities?.length || 0) ? pg : best
                  ).pgName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Best Value:</span>{" "}
                  {(() => {
                    const bestValue = compareList.reduce((best, pg) => {
                      const value = (pg.amenities?.length || 0) / (pg.priceRange?.min || 1);
                      const bestValue = (best.amenities?.length || 0) / (best.priceRange?.min || 1);
                      return value > bestValue ? pg : best;
                    });
                    return bestValue.pgName;
                  })()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}