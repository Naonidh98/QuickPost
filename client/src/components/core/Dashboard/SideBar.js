import React from "react";
import { sidebarLinks } from "../../../data/DashboardLinks";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import * as Icons from "react-icons/vsc";
import { FaHamburger } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export const SideBar = () => {
  const { user } = useSelector((state) => state.user);
  const [openBar, setOpenBar] = useState(false);

  return (
    <div className={`h-[100%] ${!openBar ? "" : "bg-black"} z-20`}>
      {openBar ? (
        <div className="bg-black">
          <div
            onClick={() => {
              setOpenBar(false);
            }}
            className="bg-blue-300 absolute top-0 right-0 rounded w-[40px] h-[40px] m-2  p-1  cursor-pointer text-2xl text-white flex items-center justify-center"
          >
            <IoClose />
          </div>
          <div className="h-full text-white p-2">
            {sidebarLinks.map((data, index) => {
              const Icon = Icons[data.icon];

              if (data.id === 7) {
                return (
                  <div
                    key={index}
                    className="w-full h-1 rounded  bg-white"
                  ></div>
                );
              }

              if (user.accountType === data.type || data.type === "All") {
                return (
                  <Link key={index} to={data.path}>
                    <div className="m-4 flex items-center gap-2">
                      <Icon className="md:text-lg text-3xl" />
                      {data.name}
                    </div>
                  </Link>
                );
              }
            })}
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            setOpenBar(true);
          }}
          className="bg-blue-300 rounded w-[60px] h-[60px] m-2  p-1  cursor-pointer text-2xl text-white flex items-center justify-center"
        >
          <FaHamburger />
        </div>
      )}
    </div>
  );
};
