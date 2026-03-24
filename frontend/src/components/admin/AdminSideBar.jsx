import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";

const AdminSideBar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      navigate("/");
      return;
    }

    setAdminName(user.firstName);

  }, [navigate]);



  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };



  const menuItems = [
    { name: "Dashboard", path: "/AdminSideBar/dashboard" },
    { name: "Users", path: "/AdminSideBar/users" },
    { name: "Landlords", path: "/AdminSideBar/landlords" },
    { name: "PGs", path: "/AdminSideBar/pgs" },
    { name: "Rooms", path: "/AdminSideBar/rooms" },
    { name: "Bookings", path: "/AdminSideBar/bookingsadmin" },
    { name: "PG Verification", path: "/admin/verification" }
   
  ];



  return (

    <div className="flex">

      {/* Sidebar */}
      <div className="h-screen w-64 bg-gray-900 text-white fixed shadow-lg flex flex-col">

        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          PG Finder Admin
        </div>

        <div className="px-6 py-4 border-b border-gray-700 text-sm text-gray-300">
          Logged in as <span className="font-semibold">{adminName}</span>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto">

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

        <div className="p-6 border-t border-gray-700">

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>


      {/* Page Content */}
      <div className="ml-64 w-full min-h-screen bg-gray-100 p-8">

        <Outlet />

      </div>

    </div>

  );
};

export default AdminSideBar;