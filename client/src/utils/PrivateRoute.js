import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  //const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  if (token !== null) {
    return children;
  } else {
   return <Navigate to={"/login"} />;
  }
};
