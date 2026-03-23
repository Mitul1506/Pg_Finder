import axios from "axios";
import React, { useState, useEffect } from "react"; // ✅ added useEffect
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // ✅ IMPORTANT: Set token if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const submitHandler = async (data) => {
    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/user/login",
        data
      );

      if (res.status === 200) {

        const user = res.data.user;
        const token = res.data.token;

        // ✅ Save user & token
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        // ✅ Set token globally
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // 🔥 Notify navbar
        window.dispatchEvent(new Event("userChanged"));

        toast.success("Login successful");

        // ✅ ROLE BASED REDIRECT
        if (user?.role === "admin") {
          navigate("/AdminSideBar/dashboard");
        }
        else if (user?.role === "landlord") {
          navigate("/landlord");
        }
        else {
          navigate("/");
        }

      }

    } catch (err) {

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Login failed");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">

      <div className="bg-white shadow-lg rounded-md w-full max-w-5xl flex overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
            alt="room"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 p-10">

          <h2 className="text-2xl font-bold mb-2 text-indigo-600">
            PG-FINDER
          </h2>

          <p className="text-gray-500 mb-6">
            Sign into your account
          </p>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="space-y-4"
          >

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-600">
                Email address
              </label>

              <input
                type="email"
                className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("email", {
                  required: "Email is required"
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-600">
                Password
              </label>

              <input
                type="password"
                className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters"
                  }
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-gray-500 mt-3 cursor-pointer hover:text-indigo-600">
              <Link
    to="/forgotpassword"
    className="cursor-pointer hover:text-indigo-600 hover:underline"
  >
    Forgot password?
  </Link>
            </p>

            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Register here
              </Link>
            </p>

          </form>

          <p className="text-xs text-gray-400 mt-6">
            Terms of use. Privacy policy
          </p>

        </div>
      </div>
    </div>
  );
}