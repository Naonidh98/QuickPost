import { useState } from "react";
import React from "react";
import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

//import pages
import { Home, Login, Profile, Register, ResetPassword ,EmailVerification} from "./pages/index";
import { EditProfile } from "./components/index";
import { useSelector } from "react-redux";

//function to check user logged-in or not.
function Layout() {
  const { user ,token} = useSelector((state) => state.user);
  console.log("user : ", user);
  console.log("token : ", token);

  if (user && token) {
    return <Outlet />;
  } else {
    return <Login />;
  }
}

const App = () => {
  return (
    <div className="w-full min-h-[100vh]">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id?" element={<Profile />} />
          <Route path="/edit/profile/:id?" element={<EditProfile />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user/verify/:email/:token" element={<EmailVerification />} />
      </Routes>
    </div>
  );
};

export default App;
