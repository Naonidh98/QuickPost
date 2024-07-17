import React from "react";
import { useLocation } from "react-router-dom";

export const PostComment = () => {
  const location = useLocation();
  console.log(location.pathname.split("/")[3]);

  return <div className="w-[90%] xl:w-[1260px] mx-auto">hi</div>;
};
