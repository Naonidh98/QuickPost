import React from "react";
import { NoProfile } from "../assets";
import { Link } from "react-router-dom";
const FriendsCard = ({ friends }) => {
  return (
    <div>
      <div className="w-full text-white bg-richblack-800 shadow-sm rounded-lg px-6 py-5">
        <div className="flex items-center justify-between pb-2 border-b border-[#66666645]">
          <span>Friends</span>
          <span>{friends?.length}</span>
        </div>

        <div className="w-full flex flex-col gap-4 pt-4">
          {friends?.map((friend,index) => (
            <Link
              to={"/"}
              key={index}
              className="w-full flex gap-4 items-center cursor-pointer"
            >
              <img
                src={friend?.profileUrl ?? NoProfile}
                alt={friend?.firstName}
                className="w-10 h-10 object-cover rounded-full"
              />

              <div className="flex-1">
                <p className="text-base font-medium">
                  {`${friend?.firstName} ${friend.lastName}`}
                </p>
                <p className="text-sm text-white/30">
                  {friend?.profession ?? "No Profession"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsCard;
