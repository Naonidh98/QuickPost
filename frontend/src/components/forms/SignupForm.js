import React from "react";

import { LuUserPlus } from "react-icons/lu";
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import { sendOTP } from "../../services/operations/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  function submitHandler(data) {
    dispatch(sendOTP(data, navigate));
  }

  return (
    <div className="w-[90%] md:w-[550px] mx-auto rounded overflow-hidden border-[2px] border-black p-1">
      <div className="bg-[#8338ec] p-2">
        <div>
          <LuUserPlus className="mx-auto text-6xl" />
        </div>
        <h1 className="text-white text-4xl my-2 text-center">Signup form</h1>
        <p className="text-white text-center my-2">
          We would love to be in touch with you!
        </p>
      </div>
      <form
        className="w-full bg-white text-black py-4 px-4 flex flex-col gap-y-8"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="sm:flex gap-2">
          <div>
            <label
              htmlFor="firstname"
              className="text-lg font-semibold font-poppins p-2"
            >
              First name<sup>*</sup>
            </label>
            <input
              placeholder="Enter your first name"
              className="w-full p-2 text-lg shadow-lg"
              id="firstname"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && <span>This field is required</span>}
          </div>

          <div className="mt-4 sm:mt-0">
            <label
              htmlFor="lastname"
              className="text-lg font-semibold font-poppins p-2"
            >
              Last name<sup>*</sup>
            </label>
            <input
              placeholder="Enter your last name"
              className="w-full p-2 text-lg shadow-lg"
              id="lastname"
              {...register("lastName", { required: true })}
            />
          </div>
          {errors.lastName && <span>This field is required</span>}
        </div>

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
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>

        <div>
          <label
            htmlFor="accountType"
            className="text-lg font-semibold font-poppins p-2"
          >
            Account Type<sup>*</sup>
          </label>
          <select
            className="w-full p-2 text-lg shadow-lg"
            {...register("accountType", { required: true })}
          >
            <option className="bg-black text-white">Admin</option>
            <option className="bg-black text-white">Client</option>
          </select>
          {errors.accountType && <span>This field is required</span>}
        </div>

        <div className="sm:flex gap-2">
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

            {errors.password && <span>This field is required</span>}

            <div
              className="absolute top-10 right-5 cursor-pointer "
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
          <div className="relative mt-4 sm:mt-0">
            <label
              htmlFor="pass2"
              className="text-lg font-semibold font-poppins p-2"
            >
              Confirm Password<sup>*</sup>
            </label>
            <input
              placeholder="Confirm your password"
              className="w-full p-2 text-lg shadow-lg"
              id="pass2"
              type={`${showPass2 ? "text" : "password"}`}
              {...register("confirmPassword", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
            <div
              className="absolute top-10 right-5 cursor-pointer"
              onClick={() => {
                setShowPass2(!showPass2);
              }}
            >
              {showPass2 ? (
                <IoEye className="text-xl" />
              ) : (
                <FaEyeSlash className="text-xl" />
              )}
            </div>
          </div>
        </div>

        <button className="bg-[#8338ec] text-white p-2 w-full rounded mx-auto">
          Sign up
        </button>
      </form>
    </div>
  );
};
