import React, { useEffect, useState } from "react";
import {
  TopBar,
  ProfileCard,
  FriendsCard,
  CustomButton,
  TextInput,
  Loading,
  PostCard,
  EditProfile,
} from "../components/index";
import { friends } from "../../data/dummyData";
import { NoProfile } from "../assets/index";

import { BsPersonFillAdd, BsFiletypeGif } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  getFrndRequests,
  getSuggestedfrnd,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getMyfrnds,
} from "../services/operations/userAPI";

import { createPost, getAllPostsHome } from "../services/operations/postAPI";

const Home = () => {
  //todo : get user data from redux
  const { user, token } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [posts, setPosts] = useState([]);
  const [frnd, setFrnds] = useState(user?.friends);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (file) {
      data.image = file;
    }
    dispatch(createPost(data, token, setLoading, setPosts));
  };

  useEffect(() => {
    dispatch(getFrndRequests(token, setRequests));
    dispatch(getSuggestedfrnd(token, setSuggestedFriends));
    dispatch(getAllPostsHome(token, setLoading, setPosts));
    dispatch(getMyfrnds(token, setFrnds));
  }, []);

  return (
    <div className="home w-full px-0 lg:px-10 pb-20 2xl:py:40 bg-richblack-900 h-screen overflow-hidden">
      <TopBar />

      {/*Wrapper */}
      <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
        {/* Left section */}
        <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
          <ProfileCard user={user} frnd={frnd} />
          <FriendsCard friends={frnd} />
        </div>

        {/* Center section */}
        <div className="text-white rounded-lg flex-1 h-full bg-richblack-800 px-4 flex flex-col gap-6 overflow-y-auto">
          <form
            className="bg-richblack-800 px-4 rounded-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
              <img
                src={user?.profileUrl ?? NoProfile}
                alt="User img"
                className="w-14 h-14 rounded-full object-cover"
              />
              <TextInput
                styles="w-full rounded-full py-5 bg-[#2d333e]"
                placeholder="what's on your mind..."
                name="description"
                register={register("description", {
                  required: "Write something about post",
                })}
                error={errors.description ? errors.description.message : ""}
              />
              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  } mt-0.5`}
                >
                  {errMsg.message}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              {/* Media icons  : images*/}
              <div className="flex items-center justify-between py-4">
                <label
                  htmlFor="imageUpload"
                  className="flex items-center gap-1 text-base cursor-pointer text-white/70 hover:text-white transition-colors"
                >
                  <input
                    type="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    className="hidden"
                    id="imageUpload"
                    data-max-size="5120"
                    accept=".jpeg, .png, .jpg"
                  />
                  <BiImages />
                  <span>Image</span>
                </label>
              </div>

              {/* <div className="flex items-center justify-between py-4">
                <label
                  htmlFor="videoUpload"
                  className="flex items-center gap-1 text-base cursor-pointer  text-white/70 hover:text-white transition-colors"
                >
                  <input
                    type="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    className="hidden"
                    id="videoUpload"
                    data-max-size="5120"
                    accept=".mp4,.wav"
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>
              </div>
              
              <div className="flex items-center justify-between py-4">
                <label
                  htmlFor="vgifUpload"
                  className="flex items-center gap-1 text-base cursor-pointer  text-white/70 hover:text-white transition-colors"
                >
                  <input
                    type="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    className="hidden"
                    id="vgifUpload"
                    data-max-size="5120"
                    accept=".gif"
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>
              </div>  */}

              {/* Button */}
              {posting ? (
                <Loading />
              ) : (
                <div>
                  <CustomButton
                    type={"submit"}
                    title={"Post"}
                    containerStyles={
                      "bg-[#4444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                    }
                  />
                </div>
              )}
            </div>
          </form>

          <div>
            {/* posts */}
            {loading ? (
              <div className="my-8">
                <Loading />
              </div>
            ) : posts?.length > 0 ? (
              <div>
                {posts.map((post, index) => (
                  <div key={index}>
                    <PostCard
                      post={post}
                      user={user}
                      deletePost={() => {}}
                      likePost={() => {}}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex w-full h-full items-center justify-center my-6">
                <p className="text-lg">No Post Available</p>
              </div>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="text-white hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
          <div className="w-full bg-richblack-800 shadow-sm rounded-lg px-6 py-5">
            <div className="flex items-center justify-between text-xl pb-2 border-b border-[#66666645]">
              <span>Friend Request</span>
              <span>{requests?.length}</span>
            </div>

            {/* requests */}

            <div className="w-full flex flex-col gap-4 pt-4">
              {requests?.map(({ _id, requestFrom: data }) => (
                <div key={_id} className="flex justify-between items-center">
                  <Link
                    to={"/"}
                    key={_id}
                    className="w-full flex gap-4 item-center cursor-pointer"
                  >
                    <img
                      src={data?.profileUrl ?? NoProfile}
                      alt={data?.firstName}
                      className="w-10 h-10 object-cover rounded-full"
                    />

                    <div className="flex-1">
                      <p className="text-base font-medium">
                        {`${data?.firstName} ${data?.lastName}`}
                      </p>
                      <span className="text-sm">
                        {data?.profession ?? "No Profession"}
                      </span>
                    </div>
                  </Link>

                  <div className="flex gap-1">
                    <CustomButton
                      onClick={() => {
                        dispatch(
                          acceptFriendRequest(
                            { req_id: _id },
                            token,
                            setRequests,
                            setFrnds
                          )
                        );
                      }}
                      title={"Accept"}
                      containerStyles="border border-[#666] text-xs px-1.5 py-1 rounded-full bg-[#0444a4]"
                    />
                    <CustomButton
                      onClick={() => {
                        dispatch(
                          rejectFriendRequest(
                            { req_id: _id },
                            token,
                            setRequests
                          )
                        );
                      }}
                      title={"Deny"}
                      containerStyles="border border-[#666] text-xs px-1.5 py-1 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Suggested friends */}

          <div className="w-full bg-richblack-800 shadow-sm rounded-lg px-5 py-5">
            <div className="fex items-center justify-center text-lg border-b border-[#66666645]">
              <span>Friend Suggestion</span>
            </div>
            <div className="w-full flex flex-col gap-4 pt-4">
              {suggestedFriends.map((friend) => (
                <div
                  key={friend._id}
                  className="flex items-center justify-between"
                >
                  <Link
                    to={"/"}
                    className="w-full flex gap-4 items-center cursor-pointer"
                  >
                    <img
                      src={friend?.profileUrl ?? NoProfile}
                      alt={friend?.firstName}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium">
                        {`${friend?.firstName} ${friend?.lastName}`}
                      </p>
                      <span className="text-sm">
                        {friend?.profession ?? "No Profession"}
                      </span>
                    </div>
                  </Link>

                  <div className="flex gap-1">
                    <button
                      className="bg-[#0444a430] text-sm text-white p-1 rounded"
                      onClick={() => {
                        dispatch(sendFriendRequest(friend._id, token));
                      }}
                    >
                      <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
