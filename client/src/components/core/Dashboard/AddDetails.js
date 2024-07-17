import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { updateProfileDetails } from "../../../services/operations/profile";

export const AddDetails = () => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { dark_mode } = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitHandler(data) {
    const info = {};

    info.profileId = user.profile._id;
    if (data.about !== "") {
      info.about = data.about;
    }
    if (data.dob !== "") {
      info.dob = data.dob;
    }
    if (data.phoneNo !== "") {
      info.phoneNo = data.phoneNo;
    }
    if (data.gender !== "") {
      info.gender = data.gender;
    }

    dispatch(updateProfileDetails(token, info));
  }

  return (
    <div className={`${dark_mode ? "text-white" : "text-black"} my-4`}>
      <h1 className="text-2xl font-poppins font-bold">Add details</h1>

      <form
        className="p-2 flex flex-col gap-2"
        onSubmit={handleSubmit(submitHandler)}
      >
        {/*About*/}
        <div>
          <label htmlFor="about" className={`text-xl`}>
            About :{" "}
          </label>
          <input
            placeholder={user.profile.about ? user.profile.about : "NA"}
            id="about"
            className={`w-full p-2 outline-none border-[2px]  rounded ${
              dark_mode ? "bg-richblack-800 border-white" : "border-black"
            }`}
            {...register("about")}
          />
        </div>
        <div className="flex justify-between">
          {/*Gender*/}
          <div className="w-[45%]">
            <div className="flex">
              <label htmlFor="gender" className={`text-xl`}>
                Gender :{" "}
              </label>
              <div className="ml-2 text-xl font-semibold">
                {user.profile.gender ? user.profile.gender : "NA"}
              </div>
            </div>
            <select
              id="gender"
              className={`w-full p-2 outline-none border-[2px]  rounded ${
                dark_mode ? "bg-richblack-800 border-white" : "border-black"
              }`}
              {...register("gender")}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          </div>
          {/*phone no*/}
          <div className="w-[45%]">
            <label htmlFor="ph" className="text-xl">
              Phone no :{" "}
            </label>
            <input
              placeholder={user.profile.phoneNo ? user.profile.phoneNo : "NA"}
              id="ph"
              className={`w-full p-2 outline-none border-[2px]  rounded ${
                dark_mode ? "bg-richblack-800 border-white" : "border-black"
              }`}
              {...register("phoneNo")}
            />
          </div>
          {/*dob*/}
        </div>
        <div>
          <label htmlFor="dob" className="text-2xl">
            DOB :{" "}
          </label>
          <input
            placeholder={user.profile.dob ? user.profile.dob : "NA"}
            id="dob"
            className={`w-full p-2 outline-none border-[2px]  rounded ${
              dark_mode ? "bg-richblack-800 border-white" : "border-black"
            }`}
            {...register("dob")}
          />
        </div>

        <div>
          <button
            className={`py-2 px-4 my-4 bg-yellow-50 text-black font-bold rounded`}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
