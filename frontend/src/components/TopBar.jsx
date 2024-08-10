import React from "react";
import { TbSocial } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TextInput, CustomButton } from "../components/index";
import { IoMdNotifications } from "react-icons/io";

import { logout } from "../services/operations/authAPI";

const TopBar = () => {
  //todo : get user

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSearch = async (data) => {
    console.log(data);
  };

  return (
    <div className="mt-2 sm:mt-3 topbar w-full flex items-center justify-evenly py-3 md:py-6 bg-richblack-800">
      {/* Logo */}
      <Link to={"/"} className="flex gap-2 items-center">
        <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
          <TbSocial />
        </div>

        <span className="text-xl md:text-2xl text-[#065ad8] font-semibold ">
          Sharefun
        </span>
      </Link>

      {/* search bar */}
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="hidden md:flex item-center justify-center"
      >
        <TextInput
          placeholder={"Search...."}
          styles="w-[18rem] lg:w-[38rem] rounded-l-full py-3 bg-[#2d333e] text-white outline-none border-none"
          register={register("search")}
        />
        <CustomButton
          title={"Search"}
          type={"submit"}
          containerStyles="bg-[#0444a4] text-white rounded-r-full px-6 py-2.5 mt-2"
        />
      </form>

      {/**Icons*/}
      <div className="flex gap-4 items-center text-md lg:text-xl text-white">
        {/* notifications */}
        <div className="hidden lg:flex">
          <IoMdNotifications />
        </div>

        {/* todo : logout btn handler */}
        <div>
          <CustomButton
            onClick={() => {
              dispatch(logout(navigate));
            }}
            title="Log out"
            containerStyles="text-sm px-4 md:px-6 py-1 md:py-2 bg-[#0444a4] hover:bg-richblack-800 shadow-md transition-color border border-[#666] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
