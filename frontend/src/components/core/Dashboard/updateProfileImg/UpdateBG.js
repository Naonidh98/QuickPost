import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateBackgroundImg } from "../../../../services/operations/profile";
import toast from "react-hot-toast";

export const UpdateBG = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { dark_mode } = useSelector((state) => state.darkmode);

  const [bgPicture, setbgPicture] = useState(null);

  const handleUpload = (event) => {
    event.preventDefault();
    if (bgPicture) {
      dispatch(updateBackgroundImg(token, bgPicture));
    } else {
      toast.error("Select a Background image");
    }
  };

  return (
    <div className={`${dark_mode ? "text-white" : "text-black"}`}>
      <div className="w-full h-[180px] overflow-hidden">
        <h1 className="text-2xl font-poppins font-bold">Change Background cover</h1>
        <img
          alt="background"
          src={user.bgImg}
          className="w-full h-full object-cover"
        />
      </div>
      <form className="flex flex-row-reverse gap-2" onSubmit={handleUpload}>
        <button className={`py-2 px-4 m-2 bg-yellow-50 text-black font-bold rounded`}>update</button>
        <label htmlFor="upload" className={`py-2 px-4 m-2 border-2  ${dark_mode ? "border-white text-white" : "border-black text-black"} font-bold rounded`}>{bgPicture ? "Selected" : "Select"}</label>
        <input
          id="upload"
          type="file"
          onChange={(event) => {
            const file = event.target.files[0];
            console.log(file);
            setbgPicture(file);
          }}
          className="hidden"
          accept="image/png, image/gif, image/jpeg"
        />
      </form>
    </div>
  );
};
