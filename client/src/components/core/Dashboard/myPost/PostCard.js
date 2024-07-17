import React from "react";
import { FaEdit } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setStep,
  setEditMode,
  setPostData,
} from "../../../../slices/postSlice";
export const PostCard = ({ data, setShowModal ,setPostId}) => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      {data.map((item, index) => {
        return (
          <div key={index} className="py-4 px-2 my-3 bg-richblack-900 text-white rounded flex justify-evenly">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-inter font-bold">
                {item.title.length > 15 ? (
                  <span>{`${item.title.slice(0, 25)}....`}</span>
                ) : (
                  <span>{item.title}</span>
                )}
              </p>
              <p className="font-poppins text-md ">
                {item.description.length > 15 ? (
                  <span>{`${item.description.slice(0, 25)}....`}</span>
                ) : (
                  <span>{item.description}</span>
                )}
              </p>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <p className="text-xl font-inter font-bold">
                  Status :{" "}
                  <span className="font-thin text-md">{item.status}</span>
                </p>
                <p className="text-xl font-inter font-bold">
                  created :{" "}
                  <span className="font-thin text-md">{item.createdAt}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-8 items-center text-xl">
              <div
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setEditMode(true));
                  dispatch(setPostData(item));
                  dispatch(setStep(1));
                  navigate("/dashboard/post/create");
                }}
              >
                <FaEdit />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                  setPostId(item._id);
                }}
              >
                <IoTrashBinSharp />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
