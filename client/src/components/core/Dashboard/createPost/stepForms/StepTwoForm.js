import React from "react";

import { AddImage } from "./mediaForm/AddImage";
import { AddVideo } from "./mediaForm/AddVideo";
import { useDispatch, useSelector } from "react-redux";

import { setStep } from "../../../../../slices/postSlice";
import { setEditMode } from "../../../../../slices/postSlice";

export const StepTwoForm = () => {
  const dispatch = useDispatch();
  const { step, editMode } = useSelector((state) => state.post);
  const { dark_mode } = useSelector((state) => state.darkmode);

  console.log(step);
  console.log(editMode);

  return (
    <div className="w-[90%] xl:w-[65%] mx-auto">
      <h2 className="text-center p-2 mt-5 text-xl font-bold font-poppins">Add media to Post</h2>

      {/* Add images */}
      <AddImage />

      <div className="flex flex-row-reverse gap-2">
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
            dark_mode ? "border-white text-white" : "border-black text-black"
          } font-bold rounded`}
          onClick={() => {
            dispatch(setEditMode(true));
            dispatch(setStep(1));
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};
