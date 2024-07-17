import React from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../components/core/Dashboard/SideBar";
import { useState } from "react";
export const Dashboard = () => {
  return (
    <div className="w-full flex relative z-10">
      <div className="w-[190px] h-[100%] absolute top-0 left-0">
        {" "}
        <SideBar />{" "}
      </div>

      <div className="w-[90%] xl:w-[1260px] mx-auto">
        <Outlet />
      </div>
    </div>
  );
};
