import React, { useState } from "react";

import { NavbarLinks } from "../../data/NavbarLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { IoIosSunny } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { setDarkMode } from "../../slices/darkmodeSlice";

import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

import { logout } from "../../services/operations/auth";

export const Navbar = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { dark_mode } = useSelector((state) => state.darkmode);
  const { user } = useSelector((state) => state.user);

  console.log(dark_mode);

  const navigate = useNavigate();

  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [query, setQuery] = useState("");

  function submitHandler(event) {
    event.preventDefault();
    navigate(`/category/post/${query}`);
    setQuery("");
    setOpenSearch(false);
    // reload the current page
    window.location.reload();
  }

  return (
    <div className="w-full bg-richblack-25 py-4 relative">
      <div className="w-[90%] xl:w-[1260px] mx-auto flex justify-between items-center">
        {/*LOGO*/}
        <Link to={"/"} onClick={() => setOpenMenu(false)}>
          <div className="text-2xl font-poppins font-bold">QuickPost.io</div>
        </Link>

        {/*Links*/}
        <ul className="hidden xl:flex items-center gap-[28px] text-lg font-[500]">
          {NavbarLinks.map((data, index) => {
            return (
              <Link to={data.link} key={index}>
                <li className="hover:-translate-y-1 transition">{data.name}</li>
              </Link>
            );
          })}
        </ul>

        {/* third div : login sinup */}
        <div className="hidden sm:flex items-center gap-4">
          {/*search_bar*/}

          <div
            onClick={() => {
              setOpenDropDown(false);
              setOpenSearch(!openSearch);
            }}
          >
            {openSearch ? (
              <IoIosCloseCircleOutline className="text-3xl font-bold" />
            ) : (
              <FaSearch className="text-xl" />
            )}
          </div>

          <div
            className={`absolute w-full z-20 ${
              openSearch ? "top-[68px]" : "-top-[65px]"
            } transition-all left-0 bg-richblack-800 p-1`}
          >
            <form
              className="w-[90%] md:w-[1260px] mx-auto"
              onSubmit={submitHandler}
            >
              <input
                className="w-full p-2 text-lg outline-none bg-richblack-800 text-white"
                placeholder="Search for a keyword like anime, cricket, politics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </div>

          {/* dark mode toggle btn */}
          <div
            onClick={() => {
              dispatch(setDarkMode(!dark_mode));
            }}
          >
            {dark_mode ? (
              <MdDarkMode className="text-3xl" />
            ) : (
              <IoIosSunny className="text-3xl" />
            )}
          </div>

          {/*token links*/}
          <div className="flex items-center justify-center gap-3">
            {!token && (
              <div>
                <Link to={"/login"}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                  </button>
                </Link>
              </div>
            )}
            {!token && (
              <div>
                <Link to={"/signup"}>
                  <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Signup
                  </button>
                </Link>
              </div>
            )}
            {token && user && (
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                <img
                  src={user.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {token && user && (
              <div className="relative">
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      setOpenSearch(false);
                      setOpenDropDown(!openDropDown);
                    }}
                  >
                    {!openDropDown ? (
                      <IoIosArrowDropdownCircle className="text-3xl" />
                    ) : (
                      <IoIosArrowDropupCircle className="text-3xl" />
                    )}
                  </button>
                </div>

                {/* drop down */}

                {openDropDown && (
                  <ul className="absolute transition top-10 -left-6 flex flex-col gap-4 bg-richblack-900 text-white p-2 rounded z-20">
                    <li
                      onClick={() => {
                        navigate("/dashboard/profile");
                        setOpenDropDown(false);
                      }}
                      className="text-center w-full cursor-pointer hover:font-bold transition"
                    >
                      Dashboard
                    </li>
                    <li
                      onClick={() => {
                        dispatch(logout());
                        setOpenDropDown(false);
                      }}
                      className="text-center w-full cursor-pointer hover:font-bold transition"
                    >
                      Log out
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        {/*mobile hanburger */}
        <div className="flex gap-8 items-center sm:hidden">
          {/* dark mode toggle btn */}
          <div
            onClick={() => {
              dispatch(setDarkMode(!dark_mode));
            }}
          >
            {dark_mode ? (
              <MdDarkMode className="text-3xl" />
            ) : (
              <IoIosSunny className="text-3xl" />
            )}
          </div>
          {/*search_bar*/}

          <div
            onClick={() => {
              setOpenDropDown(false);
              setOpenMenu(!openMenu);
            }}
          >
            {openMenu ? (
              <IoIosCloseCircleOutline className="text-3xl font-bold" />
            ) : (
              <GiHamburgerMenu className="text-xl" />
            )}
          </div>

          <div
            className={`absolute w-full z-20 ${
              openMenu ? "top-[68px]" : "-top-[265px]"
            } transition-all left-0 bg-richblack-800 p-2`}
          >
            {NavbarLinks.map((data, index) => {
              return (
                <Link to={data.link} key={index}>
                  <li
                    className="text-white m-2 cursor-pointer"
                    onClick={() => setOpenMenu(false)}
                  >
                    {data.name}
                  </li>
                </Link>
              );
            })}
            <div>
              <div className="flex gap-6 mx-2">
                {!token && (
                  <div>
                    <Link to={"/login"}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                      </button>
                    </Link>
                  </div>
                )}
                {!token && (
                  <div>
                    <Link to={"/signup"}>
                      <button className="bg-transparent hover:bg-blue-500  font-semibold text-white py-2 px-4 border border-white hover:border-transparent rounded">
                        Signup
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              {token && user && (
                <div>
                  <div className="w-full bg-white h-1 rounded"></div>
                  <li className="text-white m-2 cursor-pointer">
                    {`User : ${user.firstName}`}
                  </li>
                </div>
              )}
              {token && user && (
                <Link
                  to={"/dashboard/profile"}
                  onClick={() => setOpenMenu(false)}
                >
                  <li className="text-white m-2 cursor-pointer">Dashboard</li>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
