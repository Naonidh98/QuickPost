import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets/index";
import { BiLike, BiSolidLike, BiComment } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import moment from "moment";
import { useForm } from "react-hook-form";
import { TextInput, Loading, CustomButton } from "../components/index";
import { postComments } from "../../data/dummyData";

/// comment form
const CommentForm = ({ user, id, replyAt, getComments }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex items-center gap-2 py-4">
        <img
          src={user?.profileUrl ?? NoProfile}
          alt="userImg"
          className="w-10 h-10 rounded-full object-cover"
        />

        {/* input tag */}
        <TextInput
          name="comment"
          styles={"w-full rounded-full py-3 bg-richblack-900"}
          placeholder={replyAt ? `Reply @${replyAt}` : `Comment this post`}
          register={register("comment", {
            required: "Comment can not be empty",
          })}
          error={errors.comment ? errors.comment.message : ""}
        />
        {/* error message */}
        {errMsg?.message && (
          <span
            className={`text-sm ${
              errMsg?.status === "failed"
                ? "text-[#f64949f8]"
                : "text-[#2ba150fe]"
            } mt-0.5`}
          >
            {errMsg?.message}
          </span>
        )}
      </div>
      <div className="flex flex-end justify-end pb-2">
        {/*button*/}
        {loading ? (
          <Loading />
        ) : (
          <CustomButton
            title={"Submit"}
            type={"submit"}
            containerStyles={
              "bg-[#4444a4] text-white py-1 px-3 rounded-full font-semibold text-sm right-0"
            }
          />
        )}
      </div>
    </form>
  );
};

//reply card
const ReplyCard = ({ reply, user, handleLike }) => {
  return (
    <div className="w-full py-3">
      <div className="flex gap-3 items-center mb-1">
        <Link to={"/profile/" + reply?.userId?._id}>
          <img
            src={reply?.userId?.profileUrl ?? NoProfile}
            alt={reply?.userId?.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>

        <div className="">
          <Link to={"/profile/" + reply?.userId?._id}>
            <p className="font-medium text-base ">
              {`${reply?.userId?.firstName} ${reply?.userId?.lastName}`}
            </p>
          </Link>
          <span className="text-sm">
            {moment(reply?.createdAt ?? "2024-08-04").fromNow()}
          </span>
        </div>
      </div>
      <div className="ml-12 text-white/80">
        <p className="">{reply?.comment}</p>
        <div className="mt-2 flex gap-6">
          <p
            className="flex gap-2 items-center text-base cursor-pointer"
            onClick={() => {
              handleLike;
            }}
          >
            {reply?.likes?.includes(user?._id) ? (
              <BiSolidLike size={20} />
            ) : (
              <BiLike size={20} />
            )}
            <span>{`${reply?.likes.length} Likes`}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const PostCard = ({ post, user, deletePost, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  const getComments = async () => {
    setReplyComments(0);
    setComments(postComments);
    setLoading(false);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="text-white mb-2 bg-richblack-700 p-4 rounded-xl">
      {/* avatar */}
      <div className="flex gap-4 items-center mb-2">
        {/* Profile img */}
        <Link to={"/profile/" + post?.userId?._id}>
          <img
            src={post?.userId?.profileUrl ?? NoProfile}
            alt={post?.userId?.firstName}
            className="w-14 h-14 object-cover rounded-full"
          />
        </Link>

        {/* user name*/}
        <div className="w-full flex justify-between">
          <div>
            <Link to={"/profile/" + post?.userId?._id} className="">
              <p className="font-medium text-lg ">
                {`${post?.userId?.firstName} ${post?.userId?.lastName}`}
              </p>
            </Link>
            <span className="text-white/70">{post?.userId?.location}</span>
          </div>

          <div className="text-white/70">
            {moment(post?.createdAt ?? "2024-08-03").fromNow()}
          </div>
        </div>
      </div>

      {/* desc */}
      <div className="text-white/80 mt-4">
        <p>
          {showAll === post?._id
            ? post?.description
            : `${post?.description.slice(0, 300)}`}
          {post?.description.length > 301 &&
            (showAll === post?._id ? (
              <span
                className="text-blue-100 font-medium cursor-pointer ml-2"
                onClick={() => {
                  setShowAll(0);
                }}
              >
                Show Less
              </span>
            ) : (
              <span
                className="text-blue-100 font-medium cursor-pointer ml-2"
                onClick={() => {
                  setShowAll(post?._id);
                }}
              >
                Show More
              </span>
            ))}
        </p>

        {/* media */}
        <img src={post?.image} alt="" className="w-full mt-2 rounded-lg" />
      </div>

      {/* likes  + comment*/}
      <div className="mt-4 flex justify-between items-center px-3 py-2 text-base border-t border-[#66666645]">
        <p className="flex gap-2 items-center text-base cursor-pointer">
          {post?.likes?.includes(user?._id) ? (
            <BiSolidLike size={20} className="text-blue-100" />
          ) : (
            <BiLike size={20} />
          )}
          {post?.likes.length} Likes
        </p>

        <p
          className="flex gap-2 items-center text-base cursor-pointer"
          onClick={() => {
            setShowComments(post?._id);
          }}
        >
          <BiComment size={20} />
          {post?.comments?.length} Comments
        </p>

        {/* delete */}
        {user?._id === post?.userId?._id && (
          <div
            className="flex gap-1 items-center text-base cursor-pointer"
            onClick={() => {}}
          >
            <MdOutlineDeleteOutline size={20} />
            <span>Delete</span>
          </div>
        )}
      </div>

      {/* Comments */}
      <div>
        {showComments === post?._id && (
          <div className="w-full mt-4 border-t border-[#66666645] pt-4">
            <CommentForm
              user={user}
              id={post?._id}
              getComments={() => {
                getcomments(post?._id);
              }}
            />

            {/* all comment of this post */}
            {loading ? (
              <Loading />
            ) : comments.length > 0 ? (
              <div>
                {comments.map((comment) => (
                  <div key={comment?._id} className="w-full py-2">
                    <div className="flex gap-3 items-center mb-1">
                      {/*image  + bio */}

                      <Link to={"/profile/" + comment?.userId?._id}>
                        <img
                          src={comment?.userId?.profileUrl ?? NoProfile}
                          alt={comment?.userId?.firstName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </Link>
                      <Link to={"/profile/" + comment?.userId?._id}>
                        <p className="font-medium text-base text-white/80">
                          {`${comment?.userId?.firstName} ${comment?.userId?.lastName}`}
                        </p>
                      </Link>
                      <span className="text-sm text-white-90">
                        {moment(comment?.createdAt ?? "2023-05-2023").fromNow()}
                      </span>
                    </div>

                    {/* desc */}
                    <div className="ml-12">
                      <p className="pl-1">{comment?.comment}</p>

                      <div className="mt-2 flex gap-6">
                        <p className="flex gap-2 items-center text-base cursor-pointer">
                          {comment?.likes?.includes(user?._id) ? (
                            <BiSolidLike size={14} className="text-blue-50" />
                          ) : (
                            <BiLike size={14} />
                          )}
                          <span className="text-sm">{`${comment?.likes.length} Likes`}</span>
                        </p>
                        <span
                          className="text-blue-100 cursor-pointer"
                          onClick={() => {
                            setReplyComments(comment?._id);
                          }}
                        >
                          Reply
                        </span>
                      </div>

                      {/* reply on this comment  */}
                      {replyComments === comment?._id && (
                        <CommentForm
                          user={user}
                          id={comment?._id}
                          replyAt={comment?.from}
                          getComments={() => {
                            getComments(post?._id);
                          }}
                        />
                      )}
                    </div>

                    {/* replies */}
                    <div
                      className="py-2 px-8 mt-6 cursor-pointer"
                      onClick={() => {
                        setShowReply(
                          showReply === comment?.replies?._id
                            ? 0
                            : comment?.replies?._id
                        );
                      }}
                    >
                      {comment?.replies?.length > 0 && (
                        <p>Show Replies ({comment?.replies?.length})</p>
                      )}

                      {showReply === comment?.replies._id &&
                        comment?.replies?.map((reply) => (
                          <ReplyCard
                            reply={reply}
                            user={user}
                            key={reply._id}
                            handleLike={() => {
                              handleLike(
                                "/post/like-comment/" +
                                  comment?._id +
                                  "/" +
                                  reply?._id
                              );
                            }}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full text-sm py-4 text-center">
                No Comments, be first to comment
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
