import React from "react";
import loginBgVideo from "../../assets/loginBgVideo.mp4";

import { SignupForm } from "../forms/SignupForm";
import { LoginForm } from "../forms/LoginForm";

export const Template = ({ login, signup }) => {
  return (
    <div className="w-100% flex justify-center items-center pt-[100px]">
      {/*Form*/}
      <div className="text-white">{login ? <LoginForm /> : <SignupForm />}</div>
    </div>
  );
};
