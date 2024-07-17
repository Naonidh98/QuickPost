import React, { useEffect } from "react";
import { Spinner } from "../../common/Spinner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { loading: userLoading } = useSelector((state) => state.user);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { dark_mode } = useSelector((state) => state.darkmode);

  const { user } = useSelector((state) => state.user);

  if (userLoading || authLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className={`${
        dark_mode ? "text-white" : "text-black"
      } mx-auto w-11/12 max-w-[1000px] py-10`}
    >
      {!user ? (
        <div className="p-2 text-center"> relogin </div>
      ) : (
        <div className="w-full p-4">
          <div className="w-full h-[180px] overflow-hidden">
            <img
              src={user.bgImg}
              alt="background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-[140px] h-[140px] rounded-full mx-auto overflow-hidden my-4">
            <img
              src={user.image}
              alt="dp"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center flex flex-col gap-1">
            <p className="text-center text-4xl font-bold font-poppins">{`${user.firstName} ${user.lastName}`}</p>
            <p className={`text-lg ${dark_mode ? "text-puregreys-25" : "opacity-80"}`}>{`username : ${user.username}`}</p>
            <div>
              <div className="w-[35%] mx-auto flex justify-center my-4">
                <p className="font-inter text-xl font-bold">{`Connections : ${user.connections.length}`}</p>
              </div>
            </div>
            <p className="font-inter text-md">{`Mode : ${user.mode}`}</p>
            {/*<p>{`Since : ${user.createdAt}`}</p>*/}
          </div>

          <div className="mt-4">
            <div className="p-2">
              <h2 className="text-2xl font-inter font-bold">About:</h2>
              <p className="text-[18px] font-mono">
                {!user.profile.about ? (
                  <span>NA</span>
                ) : (
                  <span>{user.profile.about}</span>
                )}
              </p>
            </div>
            <div className="flex gap-8">
              <div className="p-2">
                <h2 className="text-2xl font-inter font-bold">Gender:</h2>
                <p className="text-[18px] font-mono">
                  {!user.profile.gender ? (
                    <span>NA</span>
                  ) : (
                    <span>{user.profile.gender}</span>
                  )}
                </p>
              </div>
              <div className="p-2">
                <h2 className="text-2xl font-inter font-bold">Phone no:</h2>
                <p className="text-[18px] font-mono">
                  {!user.profile.phoneNo ? (
                    <span>NA</span>
                  ) : (
                    <span>{user.profile.phoneNo}</span>
                  )}
                </p>
              </div>
            </div>
            <div className="p-2">
              <h2 className="text-2xl font-inter font-bold">DOB:</h2>
              <p className="text-[18px] font-mono">
                {!user.profile.dob ? (
                  <span>NA</span>
                ) : (
                  <span>{user.profile.dob}</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-row-reverse gap-4">
            <Link to={"/"}>
            <button className="bg-yellow-50 text-black rounded py-2 px-4">
              Home
            </button>
            </Link>
            <Link to={"/dashboard/setting"}>
            <button className="bg-yellow-50 text-black rounded py-2 px-4">
              Edit
            </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
