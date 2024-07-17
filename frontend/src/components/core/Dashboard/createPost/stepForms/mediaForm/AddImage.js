import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../../../../../services/operations/client";
import { RiCloseCircleFill } from "react-icons/ri";
import { removeImg } from "../../../../../../services/operations/client";

export const AddImage = () => {
  const { data, editMode } = useSelector((state) => state.post);
  const { token } = useSelector((state) => state.auth);
  const { dark_mode } = useSelector((state) => state.darkmode);
  const [file, setFile] = useState([]);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  console.log("post data : ", data);

  function submitHnadler(item) {
    dispatch(uploadImage(data._id, file, token, false));
  }

 

  return (
    <div className="w-[96%] mx-auto">
      <h1 className="text-center text-lg text-richblack-25">Upload Image</h1>
      <form onSubmit={handleSubmit(submitHnadler)}>
        <div>
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                {...register("image", { required: true })}
                onChange={(event) => {
                  setFile(event.target.files);
                }}
              />
            </label>
          </div>
          <div>
            {file.length !== 0 && <div>{`Selected : ${file[0].name}`}</div>}
          </div>
        </div>

        {errors.image && (
          <div>
            Required<sup>*</sup>
          </div>
        )}

        <button
          className={`my-2 p-2 bg-yellow-25 text-black rounded font-bold`}
        >
          Upload
        </button>
      </form>
      {/* prev upload files */}
      <div className="my-4">
        <div className="text-xl font-mono">Images : </div>
        {data?.images.length === 0 ? (
          <div></div>
        ) : (
          <div className="flex  gap-2">
            {data.images.map((item, index) => {
              return (
                <div className="flex gap-3 items-center max-w-[150px] text-center bg-pink-200 p-2 rounded-full">
                  <a href={item} key={index} target="_blank">
                    {`Image : ${index + 1}`}{" "}
                  </a>
                  <div
                    onClick={() => {
                      dispatch(removeImg(data._id, item, token));
                    }}
                  >
                    <RiCloseCircleFill className="text-2xl cursor-pointer" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
