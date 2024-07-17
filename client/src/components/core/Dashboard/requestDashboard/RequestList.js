import React from "react";
import { useSelector } from "react-redux";
import { ReqCard } from "./ReqCard";
export const RequestList = () => {
  const { dark_mode } = useSelector((state) => state.darkmode);
  const { user } = useSelector((state) => state.user);
  return (
    <div
      className={`${
        dark_mode ? "text-white" : "text-black"
      } mx-auto w-11/12 max-w-[1000px] py-10`}
    >
      <h2 className="text-2xl font-poppins font-bold pt-12 sm:pt-0">Request List</h2>
      <div>
        <ReqCard data={user.requests} />
      </div>
    </div>
  );
};
