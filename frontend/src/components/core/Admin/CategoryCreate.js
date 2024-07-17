import React from "react";

import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";

import { createCategory } from "../../../services/operations/admin";

export const CategoryCreate = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { dark_mode } = useSelector((state) => state.darkmode);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  function submitHandler(data) {
    dispatch(createCategory(data,token));
  }

  return (
    <div className={`${dark_mode ? "text-white" : "text-black"}`}>
      <h2 className="py-4 text-2xl font-poppins font-bold">Create Category</h2>
      <div className="w-[65%] my-2 mx-auto">
        <div>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <label className="text-xl">Title : </label>
              <input
                type="text"
                placeholder="Enter the title of post"
                className={`w-full p-2 outline-none border-[2px]  rounded ${
                  dark_mode ? "bg-richblack-800 border-white" : "border-black"
                }`}
                {...register("title", { required: true })}
              />
              {errors.title && <div>Required</div>}
            </div>
            <div className="flex flex-col">
              <label className="text-xl">Description : </label>
              <textarea
                rows={6}
                cols={30}
                type="text"
                className={`w-full p-2 outline-none border-[2px]  rounded ${
                  dark_mode ? "bg-richblack-800 border-white" : "border-black"
                }`}
                placeholder="Enter the Description of post"
                {...register("description", { required: true })}
              />
              {errors.description && <div>Required</div>}
            </div>

            <div>
              <button>Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
