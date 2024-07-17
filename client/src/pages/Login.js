import React from "react";
import { Template } from "../components/templates/Template";
export const Login = () => {
  return (
    <div className="relative">
       <div className="w-[80%] mt-2 mx-auto max-w-[480px] xl:absolute  right-2 bg-white border-2 border-yellow-50">

        <h2 className="text-xl font-poppins bg-blue-600 text-white p-2">Demo Accounts</h2>

        <div className="flex flex-col gap-3 p-1">

        <div className="">
          <h2 className="font-bold">Admin : </h2>

          <p className="font-lg">
            email : <span>admin123@gmail.com</span>
          </p>
          <p className="font-lg">
            password : <span>admin@123</span>
          </p>
        </div>
        <div>
          <h2 className="font-bold">User : </h2>

          <p className="font-lg">
            email : <span>user123@gmail.com</span>
          </p>
          <p className="font-lg">
            password : <span>user@123</span>
          </p>
        </div>  
          
        </div>  


      </div>

      <Template login={true} />
    </div>
  );
};
