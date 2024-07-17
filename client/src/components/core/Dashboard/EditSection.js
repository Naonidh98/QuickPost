import React, { useState } from "react";
import { Spinner } from "../../common/Spinner";
import { useDispatch, useSelector } from "react-redux";

import { AddDetails } from "./AddDetails";
import toast from "react-hot-toast";
import { UpdateBG } from "./updateProfileImg/UpdateBG";
import { UpdateDP } from "./updateProfileImg/UpdateDP";

export const EditSection = () => {
  const { loading: userLoading } = useSelector((state) => state.user);
  const { loading: authLoading } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.user);

  if (userLoading || authLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {!user ? (
        <div> relogin </div>
      ) : (
        <div className="w-full p-4  ">
          {/* change BG */}

          <div className="pt-20 md:pt-0">
          <UpdateBG />
          </div>

          {/* change Profile image */}

          <UpdateDP />

          {/*Additional details*/}
          <div>
            <AddDetails />
          </div>
        </div>
      )}
    </div>
  );
};
