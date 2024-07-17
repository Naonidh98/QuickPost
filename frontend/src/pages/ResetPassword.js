import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { ResetPasswordForm } from "../components/forms/ResetPasswordForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";

export const ResetPassword = () => {
  const [passUpdated, setPassUpdated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { dark_mode } = useSelector((state) => state.darkmode);

  return (
    <div
      className={`w-full flex items-center justify-center py-[250px]  ${
        dark_mode ? "text-white" : "text-black"
      }`}
    >
      {!passUpdated ? (
        <div>
          <ResetPasswordForm setPassUpdated={setPassUpdated} />
        </div>
      ) : (
        <div className="p-2 max-w-[550px]">
          <h2 className="text-4xl font-bold font-poppins">Reset complete!</h2>
          <p className="text-md">
            All done! We have sent an email to m***********@gmail.com to confirm
          </p>

          <button className="mt-8 bg-[#FFD60A] krounded py-2 mx-auto w-full">
            Return to login
          </button>

          <div className="mt-4">
            <button
              className="flex items-center gap-2"
              onClick={navigate("/login")}
            >
              <FaArrowLeft /> Back to login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
