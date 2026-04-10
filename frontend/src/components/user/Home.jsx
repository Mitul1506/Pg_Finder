import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  CurrencyRupeeIcon,
  BoltIcon,
  ShieldCheckIcon,
  MapPinIcon,
  StarIcon,
  ArrowRightIcon,
  UsersIcon,
  WifiIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState("");
  const [searchGender, setSearchGender] = useState("");

  const handleSearch = () => {
    if (searchCity) {
      navigate(`/pg-list?city=${searchCity}&gender=${searchGender}`);
    } else {
      navigate("/pg-list");
    }
  };

  const popularCities = [
    { name: "Ahmedabad", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5", pgs: "250+ PGs" },
    { name: "Gandhinagar", image: "https://images.unsplash.com/photo-1586697384968-d1d7777d3617", pgs: "180+ PGs" },
    { name: "Vadodara", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5", pgs: "200+ PGs" },
    { name: "Surat", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5", pgs: "220+ PGs" },
    { name: "Mumbai", image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7", pgs: "500+ PGs" },
    { name: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5", pgs: "450+ PGs" },
  ];

  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Verified Listings",
      description: "All PG accommodations are verified for safety, comfort and reliability.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: CurrencyRupeeIcon,
      title: "Best Prices",
      description: "Compare hundreds of PGs and choose the best option that fits your budget.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: BoltIcon,
      title: "Instant Booking",
      description: "Book your PG quickly with a simple and user-friendly process.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: UsersIcon,
      title: "Community Living",
      description: "Join vibrant communities of students and professionals.",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Student, Ahmedabad",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 5,
      text: "Found the perfect PG near my college within my budget. The booking process was super smooth!",
    },
    {
      name: "Priya Patel",
      role: "Software Engineer, Gandhinagar",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 5,
      text: "Great platform! The verification system gives me peace of mind. Highly recommend!",
    },
    {
      name: "Amit Kumar",
      role: "Student, Vadodara",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 4,
      text: "Easy to use and lots of options. Customer support is very helpful.",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white overflow-x-hidden">

      {/* HERO SECTION WITH MODERN DESIGN */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-300 to-pink-300 opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT CONTENT */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
                <span className="text-sm font-medium">✨ Trusted by 10,000+ Students</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Find Your Perfect
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                  PG Accommodation
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-white/90 leading-relaxed">
                Discover safe, affordable, and comfortable PGs for students and professionals across India. 
                Your next home is just a click away.
              </p>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-6 mt-10">
                <div>
                  <div className="text-3xl font-bold">5000+</div>
                  <div className="text-sm text-white/80">Happy Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm text-white/80">Cities Covered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="text-sm text-white/80">Verified PGs</div>
                </div>
              </div>

              {/* SEARCH CARD */}
              <div className="mt-10 bg-white/10 backdrop-blur-xl rounded-2xl p-1 border border-white/20">
                <div className="bg-white rounded-xl p-2">
                  <div className="grid md:grid-cols-3 gap-2">
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500" />
                      <input
                        type="text"
                        placeholder="Enter City"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-0 bg-gray-50"
                      />
                    </div>
                    
                    <div className="relative">
                      <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500" />
                      <select
                        value={searchGender}
                        onChange={(e) => setSearchGender(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-0 bg-gray-50 appearance-none cursor-pointer"
                      >
                        <option value="">Select Gender</option>
                        <option value="boys">Boys PG</option>
                        <option value="girls">Girls PG</option>
                        <option value="both">Co-living</option>
                      </select>
                    </div>

                    <button
                      onClick={handleSearch}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg px-6 py-3 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      <MagnifyingGlassIcon className="h-5 w-5 group-hover:scale-110 transition" />
                      <span>Search PG</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE WITH FLOATING CARDS */}
            <div className="hidden lg:block relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=500&fit=crop"
                  alt="PG Room"
                  className="rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                />
                <div className="absolute -top-10 -right-10 bg-white rounded-2xl shadow-xl p-4 animate-bounce">
                  <div className="flex items-center gap-2">
                    <StarSolidIcon className="h-5 w-5 text-yellow-400" />
                    <span className="font-bold">4.9 Rating</span>
                  </div>
                </div>
                <div className="absolute -bottom-10 -left-10 bg-white rounded-2xl shadow-xl p-4 animate-pulse">
                  <div className="flex items-center gap-2">
                    <WifiIcon className="h-5 w-5 text-indigo-600" />
                    <span className="font-bold">Free WiFi</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find your perfect PG in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Search",
                description: "Search for PGs in your preferred city",
                icon: MagnifyingGlassIcon,
              },
              {
                step: "02",
                title: "Compare",
                description: "Compare prices, amenities, and locations",
                icon: BuildingOfficeIcon,
              },
              {
                step: "03",
                title: "Book",
                description: "Book your chosen PG instantly online",
                icon: DevicePhoneMobileIcon,
              },
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="text-6xl font-bold text-indigo-100 mb-4">{item.step}</div>
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <ArrowRightIcon className="h-8 w-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose PG Finder?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make finding the perfect PG easy and reliable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR CITIES SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popular PG Cities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the best PGs in top cities across India
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCities.map((city, index) => (
              <div
                key={index}
                onClick={() => {
                  setSearchCity(city.name);
                  handleSearch();
                }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-32 object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-lg">{city.name}</h3>
                    <p className="text-white/80 text-sm">{city.pgs}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of satisfied students and professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarSolidIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <HeartIcon className="h-16 w-16 mx-auto mb-6 text-yellow-300 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect PG?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Browse hundreds of verified PG accommodations near you and book instantly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/pg-list")}
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
            >
              <span>Explore PGs Now</span>
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition" />
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Register as Landlord
            </button>
          </div>
        </div>
      </section>

      {/* BACK TO TOP BUTTON (Optional) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-110 z-50"
      >
        <ArrowRightIcon className="h-5 w-5 transform -rotate-90" />
      </button>
    </div>
  );
};

export default Home;