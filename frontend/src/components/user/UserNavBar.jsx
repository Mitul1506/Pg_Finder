import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const UserNavBar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const token = localStorage.getItem("token");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find PG", path: "/pg-list" },
    { name: "My Bookings", path: "/mybookings" },
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
    navigate("/login");
  };

  // 👉 Get initials (M P)
  const getInitials = () => {
    if (!user) return "U";
    const first = user.firstName?.charAt(0).toUpperCase() || "";
    const last = user.lastName?.charAt(0).toUpperCase() || "";
    return first + last;
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-50 border-b">

        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-wide">
            PG Finder
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-medium transition duration-300 ${
                  location.pathname === link.path
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                {link.name}

                {/* underline animation */}
                <span className={`absolute left-0 -bottom-1 h-[2px] bg-indigo-600 transition-all duration-300 ${
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-5">

            {/* Notification */}
            {token && (
              <button
                onClick={() => navigate("/Notification")}
                className="relative text-xl hover:text-indigo-600 transition"
              >
                🔔
               
              </button>
            )}

            {/* Profile */}
            {token ? (
              <div className="relative" ref={profileRef}>

                {/* Avatar Button */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm shadow-md hover:scale-105 transition"
                >
                  {getInitials()}
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border overflow-hidden animate-fadeIn">

                    {/* User Info */}
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold text-gray-800">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email}
                      </p>
                    </div>

                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      👤 My Profile
                    </Link>

                    <Link to="/mybookings" className="block px-4 py-2 hover:bg-gray-100">
                      📖 My Bookings
                    </Link>

                    <Link to="/payments" className="block px-4 py-2 hover:bg-gray-100">
                      💳 Payments
                    </Link>

                    <Link to="/reviews" className="block px-4 py-2 hover:bg-gray-100">
                      ⭐ Reviews
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                    >
                      🚪 Logout
                    </button>

                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-indigo-600 text-white px-5 py-2 rounded-full shadow hover:bg-indigo-700 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
              ☰
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md px-6 pb-4 space-y-3">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-indigo-600"
              >
                {link.name}
              </Link>
            ))}

            {token ? (
              <>
                <Link to="/profile" className="block">Profile</Link>
                <Link to="/payments" className="block">Payments</Link>
                <Link to="/reviews" className="block">Reviews</Link>

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg"
              >
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
};

export default UserNavBar;