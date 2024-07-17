import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../services/operations/client";
export const ConfirmModal = ({
  heading,
  subHeading,
  btnName,
  btn2Name,
  setModal,
  handlerFunction,
  data,
}) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="w-screen h-screen absolute top-0 left-0 backdrop-blur-sm flex items-center justify-center">
      <div className="outline outline-2 outline-offset-2 rounded w-[80%] xl:w-[580px]">
        <h1 className="font-poppins text-4xl text-black font-bold bg-yellow-50 p-2 rounded">
          {heading}
        </h1>

        <div className="bg-richblack-100 text-black p-2">
          <p className="text-xl font-semibold">{subHeading}</p>

          <div className="mt-12 flex gap-4 flex-row-reverse">
            <button
              className="py-2 px-4 bg-yellow-50 text-black font-bold rounded"
              onClick={() => {
                dispatch(deletePost(data, token));
                setModal(false);
              }}
            >
              {btnName}
            </button>

            <button
              className="py-2 px-4 bg-black text-white rounded"
              onClick={() => {
                setModal(false);
              }}
            >
              {btn2Name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
