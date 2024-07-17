import React from "react";

import { FaLongArrowAltRight } from "react-icons/fa";

export const CTN2button = ({ title, text, bg ,ico }) => {
  return (
    <button
      className={`py-2 mx-auto font-bold text-sm flex items-center justify-center gap-2 ${text} ${bg} rounded-md px-4  cursor-pointer transition`}
    >
      {title} 
      {
        ico ? <FaLongArrowAltRight/> : ""
      }
    </button>
  );
};
