import React, { useState } from "react";

import { TbSocial } from "react-icons/tb";
import { useSelector } from "react-redux";
import { TextInput, Loading, CustomButton } from "../components/index";
import { BgImg } from "../assets/index";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async(data)=>{
    console.log(data);
  }

  return (
    <div className="w-full h-[100vh] bg-richblack-900 flex items-center justify-center p-4">
      <div className="w-full md:2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-richblack-800 rounded-xl overflow-hidden shadow-xl">
        
        {/* Left */}
        <div className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center">
          <div className="w-full flex gap-2 items-center mb-6">
            <div className="p-2 bg-[#065ad8] rounded text-white">
              <TbSocial />
            </div>
            <span className="text-2xl text-[#065ad8] font-semibold">
              ShareFun
            </span>
          </div>

          <p className="text-ascent-1 text-base font-semibold text-white">
            Log in to your account
          </p>

          <span className="text-sm mt-2 text-ascent-2  text-white">
            Welcome Back
          </span>

          <form className="py-8 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="email"
              placeholder="email@example.com"
              label="Email Address"
              labelStyles="text-white ml-2 font-semibold"
              type="email"
              register={register("email", {
                required: "Email address is required",
              })}
              styles="w-full rounded-full"
              error={errors.email ? errors.email.message : ""}
            />
            <TextInput
              name="password"
              placeholder="Enter your password"
              label="Password"
              labelStyles="text-white ml-2 font-semibold"
              type="password"
              register={register("password", {
                required: "Password is required",
              })}
              styles="w-full rounded-full"
              error={errors.password ? errors.password.message : ""}
            />

            {/* Forgot password */}
            <Link
              to="/reset-password"
              className="text-sm text-right text-[#065ad8] font-semibold"
            >
              {" "}
              Forgot Password ?{" "}
            </Link>

            {/*Form error message */}
            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {/* Submit button */}
            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                title="Login"
                containerStyles={`inline-flex justify-center rounded-md bg-[#065ad8] px-8 py-3 text-sm font-medium text-white outline-none`}
              />
            )}
          </form>

          {/* new user */}
          <p className="text-center text-sm text-white">
            Don't have any account ?
            <Link
              to="/register"
              className="text-[#065ad8] font-semibold ml-2 cursor-pointer"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Right */}
        <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-[#065ad8]">
          <div className="relative w-full flex items-center justify-center">
            <img
              src={BgImg}
              alt="Bg Img"
              className="w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover"
            />

            {/* icons */}
            <div className="absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full">
              <BsShare size={14} />
              <span className="text-xs font-medium">Share</span>
            </div>
            <div className="absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full">
              <ImConnection size={14} />
              <span className="text-xs font-medium">Share</span>
            </div>
            <div className="absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full">
              <AiOutlineInteraction size={14} />
              <span className="text-xs font-medium">Share</span>
            </div>

            
          </div>
          <div className="mt-16 text-center">
              <p className="text-white text-base">
                Connect with friends & have share for fun
              </p>

              <span className="text-sm text-white/80">
                Share memories with friends and the world
              </span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
