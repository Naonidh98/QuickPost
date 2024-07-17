import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiUserAdd } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";

import { sendRequest } from "../../../../services/operations/client";

export const AccountCard = ({ data }) => {
  console.log("card : ", data);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const { user: userData } = useSelector((state) => state.user);

  return (
    <div>
      {data.length !== 0 && (
        <div>
          {data.map((item, index) => {
            console.log(item);
            return (
              <div
                key={index}
                className="py-4 px-2 my-3 bg-richblack-900 rounded flex justify-evenly"
              >
                <div className="flex gap-8 items-center cursor-pointer">
                  <div>
                    {" "}
                    <div className="w-[65px] h-[65px] rounded-full overflow-hidden">
                      <img
                        src={item.image}
                        alt="dp"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-lg font-bold font-inter">{`${item.firstName} ${item.lastName}`}</h2>
                    <h3 className="text-md opacity-60">{`${item.username}`}</h3>
                  </div>
                </div>
                <div>
                  {userData.connections.includes(item._id) ||
                  item.connections.includes(userData._id) ? (
                    <div className="flex flex-col gap-2 items-center cursor-pointer">
                      <FaUserFriends className="text-2xl" />
                      <p>Friends</p>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col gap-2 items-center cursor-pointer"
                      onClick={() => {
                        const data = {
                          frndId: item._id,
                        };

                        dispatch(sendRequest(data, token));
                      }}
                    >
                      <TiUserAdd className="text-2xl" />
                      <p>Add Friend</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
