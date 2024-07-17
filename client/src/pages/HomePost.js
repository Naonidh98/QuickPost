import React from "react";
import { useSelector } from "react-redux";

import { Posts } from "../components/core/Feed/Posts";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

export const HomePost = () => {
  const { dark_mode } = useSelector((state) => state.darkmode);

  return (
    <div
      className={`w-[92%] xl:w-[1260px] mx-auto ${
        dark_mode ? "text-white" : "text-black"
      }`}
    >
      <Link to={"/dashboard/post/create"}>
      <h2 className="cursor-pointer font-poppins text-3xl font-bold py-4 flex gap-4 items-center">
      Start Sharing Your Thoughts <IoIosAddCircle  className="text-4xl"/>{" "}
      </h2>
      </Link>

      <div>
        <Posts />
      </div>
    </div>
  );
};
