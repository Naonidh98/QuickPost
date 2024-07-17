import React from "react";

import { FaLongArrowAltRight } from "react-icons/fa";

import { useSelector } from "react-redux";
export const CTNbutton = ({ title }) => {
  const { dark_mode } = useSelector((state) => state.darkmode);
  return (
    <button className={`py-2 mx-auto text-sm flex items-center justify-center gap-2 ${dark_mode ? "text-richblack-800 font-bold bg-white": "bg-richblack-800 text-white"} rounded-full px-4 hover:scale-75 cursor-pointer transition`}>
      {title} <FaLongArrowAltRight />{" "}
    </button>
  );
};
