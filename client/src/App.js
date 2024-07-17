import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";

import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";

import { VerifyEmail } from "./pages/VerifyEmail";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";

import { PrivateRoute } from "./utils/PrivateRoute";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./components/core/Dashboard/Profile";
import { EditSection } from "./components/core/Dashboard/EditSection";
import { Friend } from "./components/core/Dashboard/friendsDashboard/Friend";
import { MyPost } from "./components/core/Dashboard/myPost/MyPost";
import { RequestList } from "./components/core/Dashboard/requestDashboard/RequestList";
import { Categories } from "./pages/Categories";
import { HomePost } from "./pages/HomePost";
import { PostComment } from "./pages/PostComment";
import { AdminDashboard } from "./components/core/Admin/AdminDashboard";
import { CategoryCreate } from "./components/core/Admin/CategoryCreate";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ContactUs } from "./pages/ContactUs";
import { AboutUs } from "./pages/AboutUs";
import { CategoryPost } from "./pages/CategoryPost";

import { Post } from "./components/core/Dashboard/createPost/Post";
import { useSelector } from "react-redux";

function App() {
  const { dark_mode } = useSelector((state) => state.darkmode);
  console.log("darkmode : ", dark_mode);

  return (
    <div
      className={`w-screen h-screen overflow-x-hidden ${
        dark_mode ? "bg-bgblack-5" : "bg-white"
      }`}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password/update/:id" element={<ResetPassword />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/category/post/:id" element={<CategoryPost />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              {" "}
              <Categories />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              {" "}
              <HomePost />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/post/comment/:id"
          element={
            <PrivateRoute>
              {" "}
              <PostComment />{" "}
            </PrivateRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              {" "}
              <Dashboard />{" "}
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/setting" element={<EditSection />} />
          <Route path="/dashboard/post/create" element={<Post />} />
          <Route path="/dashboard/friends" element={<Friend />} />
          <Route path="/dashboard/posts/all" element={<MyPost />} />
          <Route path="/dashboard/friend/req" element={<RequestList />} />
          <Route path="/dashboard/Admin" element={<AdminDashboard />} />
          <Route
            path="/dashboard/category/create"
            element={<CategoryCreate />}
          />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}  

export default App;
