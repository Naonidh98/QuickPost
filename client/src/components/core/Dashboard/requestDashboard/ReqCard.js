import React, { useEffect } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { RiCloseCircleFill } from "react-icons/ri";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../../common/Spinner";
import { getAllRequest } from "../../../../services/operations/client";
import { acceptSendRequest } from "../../../../services/operations/client";
import { rejectSendRequest } from "../../../../services/operations/client";

export const ReqCard = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    async function getReq() {
      dispatch(getAllRequest(token, setLoading, setData));
    }

    getReq();
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {data.length === 0 ? (
            <div className="py-4">No connection request</div>
          ) : (
            <div>
              {data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="py-4 px-2 my-3 bg-richblack-900 rounded flex justify-evenly items-center"
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
                    <div className="flex gap-8">
                      <button
                        className="text-4xl"
                        onClick={() => {
                          dispatch(
                            acceptSendRequest({ frndId: item._id }, token)
                          );
                        }}
                      >
                        <IoCheckmarkCircle />
                      </button>
                      <button className="text-4xl" onClick={() => {
                          dispatch(
                            rejectSendRequest({ frndId: item._id }, token)
                          );
                        }}>
                        <RiCloseCircleFill />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
