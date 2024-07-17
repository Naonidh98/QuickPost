import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { resetPasswordToken } from "../services/operations/auth";


export const ForgotPassword = () => {

  const [email,setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {dark_mode} = useSelector((state)=>state.darkmode)

  function submitHandler(){
    if(email === ""){
      toast.error("Provide a email address")
    } 
    else{
      dispatch(resetPasswordToken(email,setEmailSent));
    }
  }


  return (
    <div className={`w-full flex items-center justify-center py-[250px]  ${dark_mode ? "text-white" : "text-black"}`}>
      {emailSent ? (
        <div className="p-2 max-w-[550px]">
          <h2 className="text-4xl font-bold font-poppins">
            Check email
          </h2>
          <p className="text-md mt-1">
            We have sent the reset email to youremailaccount@gmail.com
          </p>

          <button className="mt-8 bg-[#FFD60A] text-black rounded py-2 mx-auto w-full" onClick={submitHandler}>
            Resend email
          </button>

          <div className="mt-4">
            <button className="flex items-center gap-2" onClick={()=>{navigate("/login")}}>
              <FaArrowLeft /> Back to login
            </button>
          </div>
        </div>
      ) : (
        <div className="p-2 max-w-[550px] ">
          <h2 className="text-4xl  font-bold font-poppins">
            Reset your password
          </h2>
          <p className="text-md mt-1">
            Have no fear. We’ll email you instructions to reset your password.
            If you dont have access to your email we can try account recovery
          </p>

          <div className="mt-4">
          <label
            htmlFor="email"
            className="text-lg font-semibold font-poppins p-2"
          >
            Email address<sup>*</sup>
          </label>
          <input
            placeholder="Enter your email address"
            className="w-full p-2 text-black text-lg shadow-lg"
            id="email"
            type="email"
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </div>

          <button className="mt-8 bg-[#FFD60A] text-black rounded py-2 mx-auto w-full" onClick={submitHandler}>
            Reset Password
          </button>

          <div className="mt-4">
            <button className="flex items-center gap-2" onClick={()=>{navigate("/login")}}>
              <FaArrowLeft /> Back to login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
