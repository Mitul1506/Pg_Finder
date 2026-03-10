import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSideBar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Manage PG", path: "/admin/pg" },
    { name: "Bookings", path: "/admin/bookings" },
    { name: "Users", path: "/admin/users" },
    { name: "Reports", path: "/admin/reports" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed shadow-lg">
      
      {/* Logo */}
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      {/* Menu */}
      <div className="mt-6 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block px-6 py-3 transition duration-300 ${
              location.pathname === item.path
                ? "bg-indigo-600"
                : "hover:bg-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-6 w-full px-6">
        <button className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;