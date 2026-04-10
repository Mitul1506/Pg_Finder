import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  WifiIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  HeartIcon,
  StarIcon,
  UsersIcon,
  HomeModernIcon,
  BuildingOfficeIcon,
  FireIcon,
  ChevronRightIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

export default function PgList() {
  const [pgs, setPgs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [likedPgs, setLikedPgs] = useState([]);
  const navigate = useNavigate();

  // GET ALL PGS
  const getPgs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/pgs");
      setPgs(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load PGs");
    }
  };

  useEffect(() => {
    getPgs();
  }, []);

  // Get unique cities for filter
  const cities = [...new Set(pgs.map(pg => pg.address?.city).filter(Boolean))];

  const amenitiesList = ["WiFi", "Parking", "AC", "Meals", "Gym", "Laundry", "Security", "Power Backup"];

  // SEARCH & FILTER LOGIC
  const filteredPgs = pgs.filter((pg) => {
    const name = pg.pgName?.toLowerCase() || "";
    const area = pg.address?.area?.toLowerCase() || "";
    const city = pg.address?.city?.toLowerCase() || "";
    const searchTerm = search.toLowerCase();
    
    const matchesSearch = 
      name.includes(searchTerm) ||
      area.includes(searchTerm) ||
      city.includes(searchTerm);
    
    const matchesCity = !selectedCity || pg.address?.city === selectedCity;
    
    const matchesPrice = !selectedPriceRange || (() => {
      const minPrice = pg.priceRange?.min || 0;
      if (selectedPriceRange === "0-5000") return minPrice <= 5000;
      if (selectedPriceRange === "5000-10000") return minPrice > 5000 && minPrice <= 10000;
      if (selectedPriceRange === "10000-15000") return minPrice > 10000 && minPrice <= 15000;
      if (selectedPriceRange === "15000+") return minPrice > 15000;
      return true;
    })();
    
    const matchesAmenities = selectedAmenities.length === 0 || 
      selectedAmenities.every(amenity => 
        pg.amenities?.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
      );
    
    return matchesSearch && matchesCity && matchesPrice && matchesAmenities;
  });

  const toggleLike = (pgId) => {
    setLikedPgs(prev => 
      prev.includes(pgId) ? prev.filter(id => id !== pgId) : [...prev, pgId]
    );
    toast.success(likedPgs.includes(pgId) ? "Removed from favorites" : "Added to favorites");
  };

  const clearFilters = () => {
    setSelectedCity("");
    setSelectedPriceRange("");
    setSelectedAmenities([]);
    setSearch("");
    toast.info("Filters cleared");
  };

  const getPriceTag = (min, max) => {
    if (min <= 5000) return { label: "Budget Friendly", color: "bg-green-100 text-green-700" };
    if (min <= 10000) return { label: "Moderate", color: "bg-blue-100 text-blue-700" };
    if (min <= 15000) return { label: "Premium", color: "bg-purple-100 text-purple-700" };
    return { label: "Luxury", color: "bg-amber-100 text-amber-700" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      
      {/* HERO BANNER */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white pt-24 pb-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Find Your Perfect PG
          </h1>
          <p className="text-center text-white/90 text-lg max-w-2xl mx-auto">
            Discover safe, comfortable, and affordable PG accommodations near you
          </p>
          
          {/* STATS */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold">{pgs.length}+</div>
              <div className="text-sm text-white/80">PG Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-white/80">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-sm text-white/80">Happy Students</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* SEARCH AND FILTERS BAR */}
        <div className="bg-white rounded-2xl shadow-lg p-4 -mt-16 relative z-10 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by PG name, area, or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
              />
            </div>
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Filters</span>
              {(selectedCity || selectedPriceRange || selectedAmenities.length > 0) && (
                <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5">
                  {[selectedCity, selectedPriceRange, ...selectedAmenities].filter(Boolean).length}
                </span>
              )}
            </button>
            
            {/* Clear Filters Button */}
            {(selectedCity || selectedPriceRange || selectedAmenities.length > 0 || search) && (
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 px-6 py-3 text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-100 grid md:grid-cols-3 gap-6 animate-fade-in">
              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Prices</option>
                  <option value="0-5000">Under ₹5,000</option>
                  <option value="5000-10000">₹5,000 - ₹10,000</option>
                  <option value="10000-15000">₹10,000 - ₹15,000</option>
                  <option value="15000+">₹15,000+</option>
                </select>
              </div>
              
              {/* Amenities Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map(amenity => (
                    <button
                      key={amenity}
                      onClick={() => {
                        setSelectedAmenities(prev =>
                          prev.includes(amenity)
                            ? prev.filter(a => a !== amenity)
                            : [...prev, amenity]
                        );
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedAmenities.includes(amenity)
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RESULTS COUNT */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Found <span className="font-bold text-indigo-600">{filteredPgs.length}</span> properties
          </p>
          <p className="text-sm text-gray-500">Showing best matches for you</p>
        </div>

        {/* NO RESULTS */}
        {filteredPgs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <BuildingOfficeIcon className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No PGs found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-indigo-600 font-medium hover:text-indigo-700"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPgs.map((pg) => {
              const priceTag = getPriceTag(pg.priceRange?.min, pg.priceRange?.max);
              return (
                <div
                  key={pg._id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1 cursor-pointer"
                  onClick={() => navigate(`/RoomList/${pg._id}`)}
                >
                  {/* IMAGE SECTION */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={pg.photos?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"}
                      alt={pg.pgName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Price Tag Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${priceTag.color}`}>
                        {priceTag.label}
                      </span>
                    </div>
                    
                    {/* Like Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(pg._id);
                      }}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <HeartIcon
                        className={`h-5 w-5 ${
                          likedPgs.includes(pg._id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                    
                    {/* Verification Badge */}
                    {pg.verificationBadge && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <ShieldCheckIcon className="h-4 w-4 text-white" />
                        <span className="text-white text-xs font-medium">Verified</span>
                      </div>
                    )}
                    
                    {/* Rating Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                      <StarSolidIcon className="h-3 w-3 text-yellow-400" />
                      <span className="text-white text-xs font-medium">4.5</span>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* NAME */}
                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                      {pg.pgName}
                    </h2>
                    
                    {/* LOCATION */}
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{pg.address?.area}, {pg.address?.city}</span>
                    </div>
                    
                    {/* PRICE */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <CurrencyRupeeIcon className="h-5 w-5 text-indigo-600" />
                        <span className="text-2xl font-bold text-indigo-600">
                          {pg.priceRange?.min}
                        </span>
                        <span className="text-gray-500">
                          - {pg.priceRange?.max}/month
                        </span>
                      </div>
                    </div>
                    
                    {/* AMENITIES */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {pg.amenities?.slice(0, 3).map((a, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-lg flex items-center gap-1"
                        >
                          {a === "WiFi" && <WifiIcon className="h-3 w-3" />}
                          {a}
                        </span>
                      ))}
                      {pg.amenities?.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-lg">
                          +{pg.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    {/* BUTTON */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/RoomList/${pg._id}`);
                      }}
                      className="w-full mt-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <span>View Available Rooms</span>
                      <ChevronRightIcon className="h-4 w-4 group-hover/btn:translate-x-1 transition" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* LOAD MORE (Optional) */}
        {filteredPgs.length >= 9 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300">
              Load More Properties
            </button>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}