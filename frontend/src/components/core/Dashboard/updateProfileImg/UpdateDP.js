import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateProfileImg } from "../../../../services/operations/profile";
import toast from "react-hot-toast";

export const UpdateDP = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { dark_mode } = useSelector((state) => state.darkmode);

  const [profilePicture, setProfilePicture] = useState(null);

  const handleUpload = (event) => {
    console.log(profilePicture);
    event.preventDefault();
    if (profilePicture) {
      dispatch(updateProfileImg(token, profilePicture));
    } else {
      toast.error("Select a Profile image");
    }
  };

  return (
    <div className={`${dark_mode ? "text-white" : "text-black"}`}>
      <h1 className="text-2xl font-poppins font-bold">Update Profile Image</h1>
      <div className="w-[95px] h-[95px] rounded-full overflow-hidden m-2">
        <img
          alt="background"
          src={user.image}
          className="w-full h-full object-cover"
        />
      </div>
      <form className="flex  gap-2" onSubmit={handleUpload}>
        <label className={`py-2 px-4 m-2 border-2  ${dark_mode ? "border-white text-white" : "border-black text-black"} font-bold rounded`} htmlFor="upload2">{profilePicture ? "Selected" : "Select"}</label>
        <input
          id="upload2"
          type="file"
          onChange={(event) => {
            const file = event.target.files[0];
            console.log(file);
            setProfilePicture(file);
          }}
          className="hidden"
          accept="image/png, image/gif, image/jpeg"
        />

        <button className={`py-2 px-4 m-2 bg-yellow-50 text-black font-bold rounded`}>update</button>
      </form>
    </div>
  );
};
