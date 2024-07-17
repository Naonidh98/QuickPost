import React from "react";
import { useSelector } from "react-redux";

import {StepOneForm} from "./stepForms/StepOneForm"
import {StepTwoForm} from "./stepForms/StepTwoForm"
import {StepThreeForm} from "./stepForms/StepThreeForm"
import { StepFourForm } from "./stepForms/StepFourForm";

export const Post = () => {
  const { data: postData, step ,editMode } = useSelector((state) => state.post);
  const { dark_mode } = useSelector((state) => state.darkmode);



  return (
    <div className={`${
      dark_mode ? "text-white" : "text-black"
    } mx-auto w-11/12 max-w-[1000px] py-10`}>
      <h2 className="text-2xl font-inter font-bold text-left pt-12 sm:pt-0">{`${editMode ? "Update" : "Create"} Post`}</h2>
      {
        step === 1 && <StepOneForm/>
      }  
      {
        step === 2 && <StepTwoForm/>
      }  
      {
        step === 3 && <StepFourForm/>
      }  
     
    </div>
  );
};
