import React from "react";
import { getMyfrnds } from "../services/operations/userAPI";
import { Link } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { FriendsCard } from "../components/index";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { CustomButton } from "../components/index";
import {
  acceptFriendRequest,
  rejectFriendRequest,
  getFrndRequests,
} from "../services/operations/userAPI";

const UserReq = () => {
  const { user, token } = useSelector((state) => state.user);
  const [frnd, setFrnds] = useState(user?.friends);
  const [requests, setRequests] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getMyfrnds(token, setFrnds));
    dispatch(getFrndRequests(token, setRequests));
  }, []);

  return (
    <div className="w-screen h-screen bg-richblack-900 text-white flex items-center justify-center">
      <Link to={"/"} className="absolute top-2 left-0">
        <div className="text-white text-4xl p-4">
          <IoIosArrowDropleftCircle />
        </div>
      </Link>

      <div className="w-[90%]">
        {/* requests */}

        {
          requests.length > 0 ? <div className="w-full flex flex-col gap-4 pt-4">
          {requests?.map(({ _id, requestFrom: data }) => (
            <div key={_id} className="flex justify-between items-center">
              <Link
                to={"/"}
                key={_id}
                className="w-full flex gap-4 item-center cursor-pointer"
              >
                <img
                  src={data?.profileUrl}
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
                  onClick={() => {
                    dispatch(
                      acceptFriendRequest(
                        { req_id: _id },
                        token,
                        setRequests,
                        setFrnds
                      )
                    );
                  }}
                  title={"Accept"}
                  containerStyles="border border-[#666] text-xs px-1.5 py-1 rounded-full bg-[#0444a4]"
                />
                <CustomButton
                  onClick={() => {
                    dispatch(
                      rejectFriendRequest({ req_id: _id }, token, setRequests)
                    );
                  }}
                  title={"Deny"}
                  containerStyles="border border-[#666] text-xs px-1.5 py-1 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>  : <div className="text-center">
        No Friend Requests.
        </div>
        }

      </div>
    </div>
  );
};

export default UserReq;
