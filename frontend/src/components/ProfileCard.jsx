import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NoProfile } from "../assets/index";
import { LiaEditSolid } from "react-icons/lia";
import {
  BsPersonFillAdd,
  BsBriefcase,
  BsInstagram,
  BsFacebook,
  BsTwitter,
} from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

import { useDispatch } from "react-redux";
import moment from "moment";

const ProfileCard = ({ user ,frnd }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);

  return (
    <div className="w-full bg-richblack-800 text-white flex flex-col items-center shadow-sm rounded-xl px-6 py-4">
      {/* Profile img */}
      <div className="w-full flex items-center justify-between border-b pb-5 border-[#66666645]">
        <Link className="flex gap-2">
          <img
            src={user?.profileUrl ?? NoProfile}
            alt={user?.email}
            className="w-14 h-14 object-cover rounded-full"
          />

          <div className="flex flex-col justify-center">
            <p className="textlg font-medium">
              {`${user?.firstName}
               ${user?.lastName}`}
            </p>
            <span>{user?.profession ?? "No Profession"}</span>
          </div>
        </Link>

        {/*Edit or add */}
        <div className="">
          {true ? (
            <LiaEditSolid
              size={22}
              className="text-blue cursor-pointer text-[#0f52b6] hover:text-white transition-colors"
              onClick={() => {
                navigate(`/edit/profile/${user._id}`);
              }}
            />
          ) : (
            /* todo : add onclick */
            <button
              className="bg-[#0444a430] text-sm text-white p-1 rounded"
              onClick={() => {}}
            >
              <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
            </button>
          )}
        </div>
      </div>

      {/* Bio */}
      <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645]">
        <div className="flex gap-2 items-center">
          <CiLocationOn className="text-xl" />
          <span>{user?.location ?? "Add Location"}</span>
        </div>
        <div className="flex gap-2 items-center">
          <BsBriefcase className="text-xl" />
          <span>{user?.profession ?? "Add Profession"}</span>
        </div>
      </div>

      {/* Date of joining */}
      <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645]">
        <p className="text-xl font-semibold">
          {`${frnd?.length} Friends`}
        </p>

        {/*<div className="flex items-center justify-between">
          <span className="">Who viewed your profile</span>
          <span className="text-lg">{user?.views?.length}</span>
        </div>
        */}

        <span className="text-base text-blue-200">
          {user?.verified ? "Verified Account" : "Not Verified"}
        </span>

        {/* User joined date */}
        <div className="flex items-center gap-4">
          <span className="">Joined :</span>
          <span className="text-base">{moment(user?.createdAt).fromNow()}</span>
        </div>

        <div></div>
      </div>

      {/* Social links */}
      <div className="w-full flex flex-col gap-4 py-6 pb-6">
        <p className="text-lg font-semibold">Social Profile</p>

        <div className="flex gap-2 items-center">
          <BsInstagram />
          <span>Instagram</span>
        </div>
        <div className="flex gap-2 items-center">
          <BsTwitter />
          <span>Twitter</span>
        </div>
        <div className="flex gap-2 items-center">
          <BsFacebook />
          <span>Facebook</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
