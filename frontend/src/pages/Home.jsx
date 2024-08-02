import React, { useState } from "react";
import {
  TopBar,
  ProfileCard,
  FriendsCard,
  CustomButton,
} from "../components/index";
import { user, requests, friends, suggest } from "../../data/dummyData";
import { NoProfile } from "../assets/index";
import { BsPersonFillAdd } from "react-icons/bs";
import { Link } from "react-router-dom";
const Home = () => {
  //todo : get user data from redux

  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);

  return (
    <div className="home w-full px-0 lg:px-10 pb-20 2xl:py:40 bg-richblack-900 h-screen overflow-hidden">
      <TopBar />

      {/*Wrapper */}
      <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
        {/* Left section */}
        <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
          <ProfileCard user={user} />
          <FriendsCard friends={user?.friends} />
        </div>

        {/* Center section */}
        <div className="text-white flex-1 h-full bg-richblack-800 px-4 flex flex-col gap-6 overflow-y-auto">
          center
        </div>

        {/* Right section */}
        <div className="text-white hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
          <div className="w-full bg-richblack-800 shadow-sm rounded-lg px-6 py-5">
            <div className="flex items-center justify-between text-xl pb-2 border-b border-[#66666645]">
              <span>Friend Request</span>
              <span>{requests?.length}</span>
            </div>

            {/* requests */}
            <div className="w-full flex flex-col gap-4 pt-4">
              {friendRequest?.map(({ _id, requestFrom: data }) => (
                <div key={_id} className="flex justify-between items-center">
                  <Link
                    to={"/profile/" + data._id}
                    key={_id}
                    className="w-full flex gap-4 item-center cursor-pointer"
                  >
                    <img
                      src={data?.profileUrl ?? NoProfile}
                      alt={data?.firstName}
                      className="w-10 h-10 object-cover rounded-full"
                    />

                    <div className="flex-1">
                      <p className="text-base font-medium">
                        {`${data?.firstName} ${data?.lastName}`}
                      </p>
                      <span className="text-sm">
                        {data?.profession ?? "No Profession"}
                      </span>
                    </div>
                  </Link>

                  <div className="flex gap-1">
                    <CustomButton
                      title={"Accept"}
                      containerStyles="border border-[#666] text-xs px-1.5 py-1 rounded-full bg-[#0444a4]"
                    />
                    <CustomButton
                      title={"Deny"}
                      containerStyles="border border-[#666] text-xs px-1.5 py-1 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Suggested friends */}
          <div className="w-full bg-richblack-800 shadow-sm rounded-lg px-5 py-5">
            <div className="fex items-center justify-center text-lg border-b border-[#66666645]">
              <span>Friend Suggestion</span>
            </div>
            <div className="w-full flex flex-col gap-4 pt-4">
              {suggestedFriends.map((friend) => (
                <div
                  key={friend._id}
                  className="flex items-center justify-between"
                >
                  <Link
                    to={"/profile/" + friend._id}
                    className="w-full flex gap-4 items-center cursor-pointer"
                  >
                    <img
                      src={friend?.profileUrl ?? NoProfile}
                      alt={friend?.firstName}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium">
                        {`${friend?.firstName} ${friend?.lastName}`}
                      </p>
                      <span className="text-sm">
                        {friend?.profession ?? "No Profession"}
                      </span>
                    </div>
                  </Link>

                  <div className="flex gap-1">
                    <button
                      className="bg-[#0444a430] text-sm text-white p-1 rounded"
                      onClick={() => {}}
                    >
                      <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
