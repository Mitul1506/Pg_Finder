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
    { name: "My Bookings", path: "/bookings" },
  ];

  // Load user whenever route changes
  useEffect(() => {

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  // Load on first render
  loadUser();

  // Listen for login/logout changes
  window.addEventListener("userChanged", loadUser);

  return () => {
    window.removeEventListener("userChanged", loadUser);
  };

}, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.dispatchEvent(new Event("userChanged"));

  navigate("/login");
};

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            PG Finder
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition ${
                  location.pathname === link.path
                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-6">

            {token && (
              <button onClick={() => navigate("/Notification")}
               className="text-xl cursor-pointer hover:text-indigo-600">
                🔔
              </button>
            )}

            {/* Profile Dropdown */}
            {token ? (
              <div className="relative" ref={profileRef}>

                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  {user?.firstName || "Profile"} ▼
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">

                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      👤 My Profile
                    </Link>

                    <Link
                      to="/bookings"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      📖 My Bookings
                    </Link>

                    <Link
                      to="/payments"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      💳 Payments
                    </Link>

                    <Link
                      to="/reviews"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
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
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Login / Signup
              </button>

            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl"
            >
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
                <Link to="/profile" className="block text-gray-700">
                  Profile
                </Link>

                <Link to="/payments" className="block text-gray-700">
                  Payments
                </Link>

                <Link to="/reviews" className="block text-gray-700">
                  Reviews
                </Link>

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
                Login / Signup
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