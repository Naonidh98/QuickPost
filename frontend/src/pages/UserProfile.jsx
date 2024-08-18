import React from "react";
import { ProfileCard } from "../components/index";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyfrnds } from "../services/operations/userAPI";
import { Link } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";
const UserProfile = () => {
  const { user, token } = useSelector((state) => state.user);
  const [frnd, setFrnds] = useState(user?.friends);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyfrnds(token, setFrnds));
  }, []);

  return (
    <div className="w-screen h-screen bg-richblack-900 text-white flex items-center justify-center">
      <Link to={"/"} className="absolute top-2 left-0">
        <div className="text-white text-4xl p-4">
          <IoIosArrowDropleftCircle />
        </div>
      </Link>

      <div className="w-[90%]">
        <ProfileCard user={user} frnd={frnd} />
      </div>
    </div>
  );
};

export default UserProfile;
