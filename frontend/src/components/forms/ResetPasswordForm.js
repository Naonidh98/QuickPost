import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setresetPassword } from "../../services/operations/auth";

export const ResetPasswordForm = ({setPassUpdated}) => {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();

  const {dark_mode} = useSelector((state)=>state.darkmode)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function submitHandler(data) {
    console.log(data);
    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password are not same");
      return;
    }

    const token = location.pathname.split("/")[3];
    dispatch(setresetPassword(data, token,setPassUpdated));
  }

  return (
    <div className={`p-2 max-w-[550px] ${dark_mode ? "text-white" : "text-black"}`}>
      <h2 className="text-4xl  font-bold font-poppins">
        Choose new password
      </h2>
      <p className="text-md">
        Almost done. Enter your new password and youre all set.
      </p>

      <form
        className="flex flex-col gap-4 mt-8"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="relative">
          <label
            htmlFor="pass"
            className="text-lg font-semibold font-poppins p-2"
          >
            Password<sup>*</sup>
          </label>
          <input
            placeholder="Enter your password"
            className="w-full p-2 text-black text-lg shadow-lg"
            id="pass"
            type={`${showPass ? "text" : "password"}`}
            {...register("password", { required: true })}
          />
          <div>{errors.password && <span>Required</span>}</div>
          <div
            className="absolute top-10 right-5 text-black cursor-pointer"
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

        <div className="relative">
          <label
            htmlFor="pass2"
            className="text-lg font-semibold font-poppins p-2"
          >
            Confirm Password<sup>*</sup>
          </label>
          <input
            placeholder="Confirm your password"
            className="w-full p-2 text-lg text-black shadow-lg"
            id="pass"
            type={`${showPass2 ? "text" : "password"}`}
            {...register("confirmPassword", { required: true })}
          />
          <div>{errors.confirmPassword && <span>Required</span>}</div>
          <div
            className="absolute top-10 right-5 text-black cursor-pointer"
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

        <button className="mt-8 bg-[#FFD60A] text-black rounded py-2 mx-auto w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
};
