import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, Loading, CustomButton } from "../components/index";

const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="w-full h-[100vh] bg-richblack-900 flex items-center justify-center p-6">
      <div className="bg-richblack-800 w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
        <p className="text-ascent-1 text-lg font-semibold text-white">
          Reset Password
        </p>

        <span className="text-sm text-ascent-2 text-white/40">
          Enter email address used during registration
        </span>

        <form
          className="py-4 flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
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

export default ResetPassword;
