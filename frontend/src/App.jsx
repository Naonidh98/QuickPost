import { useState } from "react";
import React from "react";
import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

//import pages
import { Home, Login,UserReq ,UserFriends,Profile,UserProfile, Register, ResetPassword ,EmailVerification,PageNotFound,ForgotPassword} from "./pages/index";
import { EditProfile } from "./components/index";
import { useSelector } from "react-redux";
import SearchResult from "./pages/SearchResult";

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
          <Route path="/search/:query?" element={<SearchResult />} />
          <Route path="/edit/profile/:id?" element={<EditProfile />} />

          <Route path="/user/profile" element={<UserProfile/>}/>
          <Route path="/user/req" element={<UserReq/>}/>
          <Route path="/user/friends" element={<UserFriends/>}/>

        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user/verify/:email/:token" element={<EmailVerification />} />
        <Route path="/reset/:email/:token" element={< ForgotPassword/>} />

        <Route path="*" element={<PageNotFound/>}/>

      </Routes>
    </div>
  );
};

export default App;
