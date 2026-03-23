import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/user/forgotpassword", data);

      if (res.status === 200) {
        toast.success("Reset link sent to your email 📩");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Forgot Password 🔑
        </h1>

        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Send Reset Link 🚀
          </button>

        </form>

      </div>
    </div>
  );
};