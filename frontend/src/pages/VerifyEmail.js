import React, { useEffect } from "react";

import { FaArrowLeft } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";
import OTPInput from "react-otp-input";
import { useState } from "react";

import { signUp } from "../services/operations/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../services/operations/auth";


import { Link } from "react-router-dom";

export const VerifyEmail = () => {
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const { signUpData } = useSelector((state) => state.auth);
  const { dark_mode } = useSelector((state) => state.darkmode);

  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    dispatch(signUp(signUpData, otp, navigate));
  }

  useEffect(() => {
    if (!signUpData) {
      navigate("/signup");
    }
  }, []);



  return (
    <div className={`flex w-[90%] sm:max-w-[550px] mx-auto items-center justify-center py-[250px] ${dark_mode ? "text-white" : "text-black"}`}>
      <div className="p-2 w-full">
        <h2 className="text-4xl  font-bold font-poppins">
          Verify email
        </h2>
        <p className="text-md mt-1">
          A verification code has been sent to you. Enter the code below
        </p>

        <form className="mt-6" onSubmit={submitHandler}>
          <div className="text-black">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              inputStyle="text-[2rem] sm:w-[20px] rounded-[8px] border-[1px] border-richblack-500 sm:text-[3rem] text-center"
              focusStyle="border-[5px] border-red-500"
              isInputNum={true}
              shouldAutoFocus={true}
              containerStyle="flex sm:justify-between gap-4 flex-wrap"
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <button className="mt-8 bg-[#FFD60A] text-black rounded py-2 mx-auto w-full">
            Verify email
          </button>
        </form>

        <div className="mt-4 flex justify-between flex-wrap gap-4">
          <Link to="/login">
          <button className="flex items-center gap-2">
            <FaArrowLeft /> Back to login
          </button>
          </Link>
          <button
            className="flex items-center gap-2"
            onClick={() => {
              dispatch(sendOTP(signUpData,navigate));
            }}
          >
            <FaClockRotateLeft /> Resend it
          </button>
        </div>
      </div>
    </div>
  );
};
