import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { BiDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { Navigation } from "swiper/modules";
import { likePost } from "../../../services/operations/client";
import { disLikePost } from "../../../services/operations/client";
import { useDispatch, useSelector } from "react-redux";

export const PostCard = ({ data, index }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  return (
    <div key={index} className="my-6 bg-richblack-900 text-white">
      <div className="flex gap-6 items-center bg-blue-700 p-2">
        {/* user image */}
        <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
          <img
            src={data.author.image}
            alt="dp"
            className="w-full h-full object-cover"
          />
        </div>
        {/* username */}
        <div>
          <h2 className="text-lg font-inter">{`${data.author.firstName} ${data.author.lastName}`}</h2>
          <h2 className="text-sm opacity-60">{data.author.username}</h2>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <h2 className="text-xl font-bold">{data.title}</h2>
        <h2 className="text-md">{data.description}</h2>
      </div>
      <div className="p-2">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {data.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt="none" className="w-[550px] mx-auto" />
            </SwiperSlide>
          ))}
          {data.videos.map((vid, index) => (
            <SwiperSlide key={index}>
              <div className="h-full w-full">
                <video controls>
                  <source src={vid} type="video/mp4" />
                </video>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-between p-4">
        <div className="flex items-center gap-[25px]">
          <button
            className="flex gap-2 items-center"
            onClick={() => {
              const item = {
                postId: data._id,
              };
              dispatch(likePost(item, token));
            }}
          >
            <BiLike /> <span>{`(${data.likes.length})`}</span> like{" "}
          </button>
          <button
            className="flex gap-2 items-center"
            onClick={() => {
              const item = {
                postId: data._id,
              };
              dispatch(disLikePost(item, token));
            }}
          >
            <BiDislike /> <span>{`(${data.dislikes.length})`}</span> dislike
          </button>
        </div>
      </div>
    </div>
  );
};
