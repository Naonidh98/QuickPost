import React, { useState } from "react";
import { TbSocial } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TextInput, CustomButton } from "../components/index";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

import { logout } from "../services/operations/authAPI";

const TopBar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [fieldValue, setFieldValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSearch = async (data) => {
    navigate(`/search/${data.search}`);
  };

  const openSearchBar = () => {
    setOpenMenu(false);
    setOpenSearch(true);
  };
  const openMenuBar = () => {
    setOpenSearch(false);
    setOpenMenu(true);
  };

  return (
    <div className="mt-2 sm:mt-3 topbar w-full flex items-center justify-evenly py-3 md:py-6 bg-richblack-800">
      {/* Logo */}
      <Link to={"/"} className="flex gap-2 items-center">
        <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
          <TbSocial />
        </div>

        <span className="text-xl md:text-2xl text-[#065ad8] font-semibold ">
          QuickPost
        </span>
      </Link>

      {/* search bar */}
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="hidden xl:flex item-center justify-center"
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
      <div className="hidden xl:flex gap-4 items-center text-md lg:text-xl text-white">
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

      {/* Icons Mobiles */}
      <div className="flex xl:hidden gap-[28px] items-center">
        {/* Search icon */}
        <div className="text-xl text-white cursor-pointer">
          {openSearch ? (
            <IoIosCloseCircle
              onClick={() => {
                setOpenSearch(false);
                setOpenMenu(false);
              }}
            />
          ) : (
            <IoSearch onClick={openSearchBar} />
          )}
        </div>
        {/* Hamburger icon */}
        <div className="text-xl text-white cursor-pointer">
          {openMenu ? (
            <IoIosCloseCircle
              onClick={() => {
                setOpenSearch(false);
                setOpenMenu(false);
              }}
            />
          ) : (
            <GiHamburgerMenu onClick={openMenuBar} />
          )}
        </div>
      </div>

      {/* Mob search bar */}

      <form
        className={`xl:hidden absolute ${
          openSearch ? "top-[70px]" : "top-[-100px]"
        } transition left-0 right-0`}
        onSubmit={() => {
          if (fieldValue !== "") {
            navigate(`/search/${fieldValue}`);
          } else {
            navigate("/");
          }
        }}
      >
        <input
          placeholder="Search...."
          className="w-[100%] px-4 py-3 bg-[#FFFF] text-black outline-none border-none"
          onChange={(e) => {
            setFieldValue(e.target.value);
          }}
        />
      </form>

      {/* Menu bar  */}
      <div
        className={`xl:hidden absolute ${
          openMenu ? "top-[70px]" : "top-[-500px]"
        } transition left-0 right-0`}
      >
        <div className="w-[100%] px-4 py-3 bg-[#219ebc] text-white outline-none border-none">
          <div className="my-4" onClick={()=>{
            navigate("/user/profile")
          }}>Profile</div>
          <div className="my-4" onClick={()=>{
            navigate("/user/req")
          }}>Requests</div>
          <div className="my-4" onClick={()=>{
            navigate("/user/friends")
          }}>Friends</div>
          <div
            className="my-4"
            onClick={() => {
              dispatch(logout(navigate));
            }}
          >
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
