import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/operations/auth";
import { useDispatch } from "react-redux";

export const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function submitHandler(data) {
    dispatch(login(data, navigate));
  }

  return (
    <div className="w-[90%] sm:w-[550px] mx-auto rounded overflow-hidden border-[2px] border-black p-1">
      <div className="bg-[#8338ec] p-2">
        <div>
          <FaUserCircle className="mx-auto text-6xl" />
        </div>
        <h1 className="text-white text-4xl my-2 text-center">Welcome</h1>
        <p className="text-white text-center my-2">Sign in to your account</p>
      </div>
      <form
        className="w-full bg-white text-black py-4 px-4 flex flex-col gap-y-8"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div>
          <label
            htmlFor="email"
            className="text-lg font-semibold font-poppins p-2"
          >
            Email address<sup>*</sup>
          </label>
          <input
            placeholder="Enter your email address"
            className="w-full p-2 text-lg shadow-lg"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Required</span>}
        </div>

        <div className="relative">
          <label
            htmlFor="pass"
            className="text-lg font-semibold font-poppins p-2"
          >
            Password<sup>*</sup>
          </label>
          <input
            placeholder="Enter your password"
            className="w-full p-2 text-lg shadow-lg"
            id="pass"
            type={`${showPass ? "text" : "password"}`}
            {...register("password", { required: true })}
          />
          {errors.password && <span>Required</span>}
          <div
            className="absolute top-10 right-5 cursor-pointer"
            onClick={() => {
              setShowPass(!showPass);
            }}
          >
            {showPass ? (
              <IoEye className="text-xl" />
            ) : (
              <FaEyeSlash className="text-xl" />
            )}
          </div>
        </div>

        <div
          className="text-richblack-900"
          onClick={() => {
            navigate("/forgot-password");
          }}
        >
          <button>Forgot password</button>
        </div>

        <button className="bg-[#8338ec] text-white p-2 w-full rounded mx-auto">
          Sign in
        </button>
      </form>
    </div>
  );
};
