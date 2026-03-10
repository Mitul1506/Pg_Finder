import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const UserNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // 🔥 added

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find PG", path: "/pg-list" },
    { name: "My Bookings", path: "/bookings" },
    { name: "Profile", path: "/profile" },
    
  ];

  // 🔥 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");   // remove JWT token
    localStorage.removeItem("user");    // if you stored user data
    navigate("/login");                      // redirect to Login page
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <h1 className="text-2xl font-bold text-indigo-600">
            PG Finder
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition duration-300 ${
                  location.pathname === link.path
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Logout Button */}
          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Login/Signup
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md px-6 pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-indigo-600"
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
};

export default UserNavBar;