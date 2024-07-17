import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setEditMode, setStep } from "../../../../../slices/postSlice";
import { Link, useNavigate } from "react-router-dom";

import {
  publishPost,
  draftPost,
} from "../../../../../services/operations/client";

export const StepFourForm = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { step, data } = useSelector((state) => state.post);
  const { dark_mode } = useSelector((state) => state.darkmode);
  console.log(data);
  return (
    <div>
      <h2 className="text-center text-lg text-richblack-25">
        Publish your post
      </h2>

      <button
        className="my-2"
        onClick={() => {
          dispatch(setEditMode(true));
          dispatch(setStep(step - 1));
        }}
      >
        Back
      </button>

      <div>
        <div className="flex flex-row-reverse gap-2">
          <button
            onClick={() => {
              dispatch(publishPost(data._id, token, naviagte));
            }}
            className={`py-2 px-4 m-2 bg-yellow-50 text-black font-bold rounded`}
          >
            Publish
          </button>

          <button
            onClick={() => {
              dispatch(draftPost(data._id, token, naviagte));
            }}
            className={`py-2 px-4 m-2 border-2  ${
              dark_mode ? "border-white text-white" : "border-black text-black"
            } font-bold rounded`}
          >
            Save as draft
          </button>
        </div>
      </div>
    </div>
  );
};
