import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TopBar, ProfileCard, FriendsCard ,PostCard , Loading} from "../components/index";
import { user,posts } from "../../data/dummyData";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  //GET USER

  //Get posts

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(null);

  return (
    <div>
      <div className="home w-full px-0 lg:px-10 pb-20 2xl:py:40 bg-richblack-900 h-screen overflow-hidden">
        <TopBar />

        <div className="w-full flex gap-2 lg:gap-4 md:pl-4 pt-5 pb-10 h-full">
          {/* Left */}
          <div className="hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-y-auto">
            <ProfileCard user={user} />

            <div className="block lg:hidden">
              <FriendsCard friends={userInfo?.friends} />
            </div>
          </div>

          {/* center */}
          <div className="text-white rounded-lg flex-1 h-full bg-richblack-800 px-4 flex flex-col gap-6 overflow-y-auto">
            {/* posts */}
            {loading ? (
              <Loading />
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
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg">No Post Available</p>
              </div>
            )}
          </div>

          {/* right */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            <FriendsCard friends={user?.friends} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
