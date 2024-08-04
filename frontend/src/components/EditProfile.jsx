import React from "react";
import { user } from "../../data/dummyData";
import { Loading, TextInput, CustomButton } from "../components/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { BiImages } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const EditProfile = () => {
  //get user from redux

  const [err, errMsg] = useState("");
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    console.log(picture);
  };

  return (
    <div className="w-screen h-screen bg-richblack-900 flex items-center justify-center">
      {/* edit form */}

      <div className="w-[90%] rounded-xl xl:w-[700px] h-fit p-5 flex flex-col justify-center bg-richblack-800">
        <div className="flex justify-between items-center">
          <p className="text-ascent-1 text-xl font-semibold text-white">
            Edit Profile
          </p>
          <Link to={"/"}>
            <IoMdClose className="text-white text-2xl cursor-pointer" />
          </Link>
        </div>

        <form
          className="py-8 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            name="firstName"
            placeholder="Enter your first name"
            label="First Name"
            labelStyles="text-white ml-2 font-semibold"
            type="text"
            styles="w-full rounded-full"
            register={register("firstName")}
            error={errors.email ? errors.firstName.message : ""}
          />
          <TextInput
            name="lastName"
            placeholder="Enter your last name"
            label="Last Name"
            labelStyles="text-white ml-2 font-semibold"
            type="text"
            styles="w-full rounded-full"
            register={register("lastName")}
            error={errors.email ? errors.lastName.message : ""}
          />
          <TextInput
            name="location"
            placeholder="Enter your location"
            label="Location"
            labelStyles="text-white ml-2 font-semibold"
            type="text"
            styles="w-full rounded-full"
            register={register("location")}
            error={errors.email ? errors.location.message : ""}
          />
          <TextInput
            name="profession"
            placeholder="Enter your profession"
            label="Profession"
            labelStyles="text-white ml-2 font-semibold"
            type="text"
            styles="w-full rounded-full"
            register={register("profession")}
            error={errors.email ? errors.profession.message : ""}
          />

          {/* profile img */}
          <div className="flex items-center justify-between py-4">
            <label
              htmlFor="imageUpload"
              className="flex items-center gap-1 text-base cursor-pointer text-white/70 hover:text-white transition-colors"
            >
              <input
                type="file"
                onChange={(e) => {
                  setPicture(e.target.files[0]);
                }}
                className="hidden"
                id="imageUpload"
                data-max-size="5120"
                accept=".jpeg, .png, .jpg"
              />
              <BiImages />
              <span>Update Profile Image</span>
            </label>
          </div>

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

          <div className="flex justify-end">
            {/* Submit button */}
            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                title="Edit Details"
                containerStyles={`w-fit rounded-md bg-[#065ad8] px-8 py-3 text-sm font-medium text-white outline-none`}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
