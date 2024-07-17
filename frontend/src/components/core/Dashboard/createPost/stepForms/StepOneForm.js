import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { getCategory } from "../../../../../services/operations/admin";

import { useForm } from "react-hook-form";

import { createPost } from "../../../../../services/operations/client";
import { setStep } from "../../../../../slices/postSlice";
import { updatePost } from "../../../../../services/operations/client";
import { Spinner } from "../../../../common/Spinner";

export const StepOneForm = () => {
  const dispatch = useDispatch();

  const [catData, setCatData] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const { dark_mode } = useSelector((state) => state.darkmode);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    data: postData,
    editMode,
    step,
    loading,
  } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getCategory(setCatData));
  }, []);

  if (editMode) {
    setValue("title", postData?.title);
    setValue("description", postData?.description);
  }

  console.log("editmode", editMode);

  function submitHandler(data) {
    if (data.categoryName === "") {
      data.categoryName = "None";
    }
    if (!editMode) {
      dispatch(createPost(token, data));
    } else {
      data.postId = postData._id;
      dispatch(updatePost(token, data));
    }
  }

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-[90%] xl:w-[65%] my-2 mx-auto">
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
              <div className="flex flex-col">
                <label className="text-xl">Category : </label>
                <select
                  {...register("categoryName")}
                  className={`w-full p-2 outline-none border-[2px]  rounded ${
                    dark_mode ? "bg-richblack-800 border-white" : "border-black"
                  }`}
                >
                  {catData.map((data, index) => (
                    <option key={index}>{data.title}</option>
                  ))}
                </select>
              </div>

              <div>
                {editMode ? (
                  <div className="flex flex-row-reverse items-center">
                    <button
                      onClick={() => {
                        dispatch(setStep(step + 1));
                      }}
                      className={`py-2 px-4 m-2 bg-yellow-50 text-black font-bold rounded`}
                    >
                      Next
                    </button>
                    <button
                      className={`py-2 px-4 m-2 border-2  ${
                        dark_mode
                          ? "border-white text-white"
                          : "border-black text-black"
                      } font-bold rounded`}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <button
                    className={`py-2 px-4 m-2 bg-yellow-50 text-black font-bold rounded`}
                  >
                    Next
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
