import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, Loading, CustomButton } from "../components/index";
import { useNavigate, useParams } from "react-router-dom";
import {
  emailVerification,
  resendEmailVerification,
} from "../services/operations/authAPI";
import { useDispatch } from "react-redux";

const EmailVerification = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate  = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(emailVerification(params));
  };

  return (
    <div className="w-full h-[100vh] bg-richblack-900 flex items-center justify-center p-6">
      <div className="bg-richblack-800 w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
        <p className="text-ascent-1 text-lg font-semibold text-white">
          Verify Email
        </p>

        <span className="text-sm text-ascent-2 text-white/40">
          If the token is expired, click on the Generate New button.
        </span>

        <form
          className="py-4 flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Submit button */}
          {isSubmitting ? (
            <Loading />
          ) : (
            <CustomButton
              type="submit"
              title="Verify"
              containerStyles={`inline-flex justify-center rounded-md bg-[#065ad8] px-8 py-3 text-sm font-medium text-white outline-none`}
            />
          )}
        </form>

        <div className="flex justify-between">
          <button
            onClick={() => {
             navigate("/login");
            }}
            className="text-[12px] text-right font-bold cursor-pointer text-[#065ad8]"
          >
            Login
          </button>
          <button
            onClick={() => {
              dispatch(resendEmailVerification({ email: params?.email }));
            }}
            className="text-[12px] text-right text-white cursor-pointer"
          >
            Generate New
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
