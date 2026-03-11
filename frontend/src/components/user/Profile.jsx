import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: ""
  });

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser({
        firstName: storedUser.firstName || "",
        lastName: storedUser.lastName || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        city: storedUser.city || ""
      });
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {

    localStorage.setItem("user", JSON.stringify(user));

    setIsEditing(false);

    toast.success("Profile Updated Successfully!");

  };

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        {/* HEADER */}
        <div className="flex items-center gap-6 mb-8">

          <div className="w-24 h-24 bg-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
            {user.firstName ? user.firstName.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{fullName}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

        </div>

        {/* PROFILE FORM */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* FIRST NAME */}
          <div>
            <label className="text-sm text-gray-600">First Name</label>

            <input
              type="text"
              name="firstName"
              value={user.firstName}
              disabled={!isEditing}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label className="text-sm text-gray-600">Last Name</label>

            <input
              type="text"
              name="lastName"
              value={user.lastName}
              disabled={!isEditing}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>

            <input
              type="email"
              name="email"
              value={user.email}
              disabled
              className="w-full p-3 border rounded-lg mt-1 bg-gray-100"
            />
          </div>

          {/* PHONE
          <div>
            <label className="text-sm text-gray-600">Phone</label>

            <input
              type="text"
              name="phone"
              value={user.phone}
              disabled={!isEditing}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

         
          <div>
            <label className="text-sm text-gray-600">City</label>

            <input
              type="text"
              name="city"
              value={user.city}
              disabled={!isEditing}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div> */}

        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex gap-4">

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Save Changes
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default Profile;