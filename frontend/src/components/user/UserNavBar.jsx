import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  StarIcon,
  BellIcon,
  MagnifyingGlassIcon,
  HeartIcon,
   ChartBarIcon,
} from "@heroicons/react/24/outline";

const UserNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const token = localStorage.getItem("token");

  const navLinks = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Find PG", path: "/pg-list", icon: BuildingOfficeIcon },
   
    { name: "Compare", path: "/compare-pgs", icon: ChartBarIcon },
     { name: "My Bookings", path: "/mybookings", icon: CalendarIcon },
  ];

  // Load user
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();
    window.addEventListener("userChanged", loadUser);

    return () => {
      window.removeEventListener("userChanged", loadUser);
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const getInitials = () => {
    if (!user) return "U";
    const first = user.firstName?.charAt(0).toUpperCase() || "";
    const last = user.lastName?.charAt(0).toUpperCase() || "";
    return first + last;
  };

  const getFullName = () => {
    if (!user) return "User";
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg" 
          : "bg-white/80 backdrop-blur-sm shadow-sm"
      } border-b border-gray-100`}>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                PG Finder
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.name}</span>
                    
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              
              {/* Search Button */}
              <button 
                onClick={() => navigate("/pg-list")}
                className="p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>

             

              {/* Profile Section */}
              {token ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-50 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md group-hover:scale-105 transition-transform">
                      {getInitials()}
                    </div>
                    <ChevronDownIcon className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                      profileOpen ? "rotate-180" : ""
                    }`} />
                  </button>

                  {/* Dropdown Menu */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
                      
                      {/* User Info Header */}
                      <div className="px-5 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                            {getInitials()}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">
                              {getFullName()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user?.email}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-green-600 capitalize">{user?.role || "User"}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                        >
                          <UserIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-600" />
                          <span className="text-gray-700 group-hover:text-indigo-600">My Profile</span>
                        </Link>

                        <Link
                          to="/mybookings"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                        >
                          <CalendarIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-600" />
                          <span className="text-gray-700 group-hover:text-indigo-600">My Bookings</span>
                        </Link>

                        <Link
                          to="/mymessages"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                        >
                          <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-600" />
                          <span className="text-gray-700 group-hover:text-indigo-600">Messages</span>
                          
                        </Link>

                        

                        <Link
                          to="/payments"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                        >
                          <CreditCardIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-600" />
                          <span className="text-gray-700 group-hover:text-indigo-600">Payments</span>
                        </Link>

                        <div className="border-t border-gray-100 my-2"></div>

                        <Link
  to="/login"
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    setProfileOpen(false);
  }}
  className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-red-50 transition-colors group"
>
  <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-400 group-hover:text-red-600" />
  <span className="text-red-600 group-hover:text-red-700">Logout</span>
</Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="px-5 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-full transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg transition-all hover:scale-105"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {menuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slide-down">
            <div className="px-4 py-3 space-y-2">
              {/* User Info for Mobile */}
              {token && user && (
                <div className="flex items-center gap-3 pb-3 mb-2 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                    {getInitials()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{getFullName()}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
              )}
              
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              
              {token ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/mymessages"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    <span>Messages</span>
                  </Link>
                  <Link
                    to="/payments"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <CreditCardIcon className="h-5 w-5" />
                    <span>Payments</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="pt-3 space-y-2">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/signup");
                      setMenuOpen(false);
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        <Outlet />
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
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default UserNavBar;