import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { setStep } from "../../../../../slices/postSlice";
import { setEditMode } from "../../../../../slices/postSlice";

import { AddVideo } from "./mediaForm/AddVideo";

export const StepThreeForm = () => {
  const dispatch = useDispatch();
  const { step } = useSelector((state) => state.post);
  const { dark_mode } = useSelector((state) => state.darkmode);

  console.log(step);
  return (
    <div>
      <h2 className="text-center p-2 mt-5 text-xl font-bold font-poppins">
        Add video media to Post
      </h2>
      <AddVideo />

      <div>
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
              dispatch(setStep(step - 1));
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
