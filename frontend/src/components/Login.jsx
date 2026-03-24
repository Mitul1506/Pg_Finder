import axios from "axios";
import React, { useState, useEffect } from "react";
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

  // SET TOKEN IF EXISTS
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

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        window.dispatchEvent(new Event("userChanged"));

        toast.success("Login successful 🎉");

        // ROLE BASED REDIRECT
        if (user?.role === "admin") {
          navigate("/AdminSideBar/dashboard");
        } else if (user?.role === "landlord") {
          navigate("/landlord");
        } else {
          navigate("/");
        }
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-pink-500">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-2xl font-bold text-center mb-6">
          Login Account 🔐
        </h1>

        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4">

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters"
                }
              })}
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* FORGOT PASSWORD */}
          <p className="text-sm text-gray-500 text-center">
            <Link
              to="/forgotpassword"
              className="hover:text-indigo-600 hover:underline"
            >
              Forgot password?
            </Link>
          </p>

          {/* SIGNUP */}
          <p className="text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}