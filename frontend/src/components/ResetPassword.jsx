import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ResetPassword = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post(
  `http://localhost:3000/user/resetpassword/${token}`,
  {
    newPassword: data.newPassword
  }
);

      if (res.status === 200) {
        toast.success("Password reset successfully ✅");
        navigate("/login");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired token");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Reset Password 🔒
        </h1>

        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4">

          <input
            type="password"
            placeholder="Enter new password"
            {...register("newPassword", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required"
              }
            })}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {errors.newPassword && (
            <p className="text-red-500 text-sm">
              {errors.newPassword.message}
            </p>
          )}

          <button
            type="submit"
            className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Reset Password 🔁
          </button>

        </form>

      </div>
    </div>
  );
};