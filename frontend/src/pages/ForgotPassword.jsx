import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, Loading, CustomButton } from "../components/index";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetPasswordUser } from "../services/operations/userAPI";
import { useParams } from "react-router-dom";
const ForgotPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password.length < 8) {
      toast.error("Password length is less than 8!");
      return;
    }
    if (data.password !== data.cPassword) {
      toast.error("Passwords do not match!");
      return;
    } else {
      //console.log(params);
      //console.log(data.password);

      dispatch(
        resetPasswordUser(
          {
            password: data.password,
          },
          params.email,
          params.token
        )
      );
    }
  };

  return (
    <div className="w-full h-[100vh] bg-richblack-900 flex items-center justify-center p-6">
      <div className="bg-richblack-800 w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
        <p className="text-ascent-1 text-lg font-semibold text-white">
          Reset Password
        </p>

        <span className="text-sm text-ascent-2 text-white/40 ">
          Please enter your new password below and confirm it.
        </span>

        <form
          className="py-4 flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            name="password"
            placeholder="minimum of 8 characters"
            label="New Password"
            labelStyles="text-white ml-2 font-semibold"
            type="password"
            register={register("password", {
              required: "Password is required",
            })}
            styles="w-full rounded-full"
            error={errors.password ? errors.password.message : ""}
          />
          <TextInput
            name="cPassword"
            placeholder="confirm password"
            label="Confirm Password"
            labelStyles="text-white ml-2 font-semibold"
            type="password"
            register={register("cPassword", {
              required: "Confirm password is required",
            })}
            styles="w-full rounded-full"
            error={errors.cPassword ? errors.cPassword.message : ""}
          />

          {/* Submit button */}
          {isSubmitting ? (
            <Loading />
          ) : (
            <CustomButton
              type="submit"
              title="Reset"
              containerStyles={`inline-flex justify-center rounded-md bg-[#065ad8] px-8 py-3 text-sm font-medium text-white outline-none`}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
