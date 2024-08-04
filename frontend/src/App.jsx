import { useState } from "react";
import React from "react";
import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

//import pages
import { Home, Login, Profile, Register, ResetPassword } from "./pages/index";
import { EditProfile } from "./components/index";

//function to check user logged-in or not.
function Layout() {
  return <Outlet />;
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
      </Routes>
    </div>
  );
};

export default App;
