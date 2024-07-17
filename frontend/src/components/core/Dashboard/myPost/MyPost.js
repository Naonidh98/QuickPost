import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../../common/Spinner";

import { fetchUserPosts } from "../../../../services/operations/client";
import { PostCard } from "./PostCard";

import { ConfirmModal } from "../../../common/ConfirmModal";
import { deletePost } from "../../../../services/operations/client";

export const MyPost = () => {
  const dispatch = useDispatch();
  const { dark_mode } = useSelector((state) => state.darkmode);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [del_postId, setPostId] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      dispatch(fetchUserPosts(token, setLoading, setData));
    }
    fetchPosts();
  }, []);

  return (
    <div
      className={`${
        dark_mode ? "text-white" : "text-black"
      } mx-auto w-11/12 max-w-[1000px] py-10`}
    >
      <div>
        {showModal && (
          <ConfirmModal
            heading={"Are you sure?"}
            subHeading={"Are you sure you want to delete this item?"}
            btn2Name={"Cancel"}
            btnName={"Delete"}
            setModal={setShowModal}
            data={{ postId: del_postId }}
          />
        )}
      </div>

      <h2 className="text-2xl font-poppins font-bold pt-12 sm:pt-0">
        My Posts
      </h2>
      <div>
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <div>
            {data.length === 0 ? (
              <div>No posts</div>
            ) : (
              <div>
                <PostCard data={data.posts} setShowModal={setShowModal} setPostId={setPostId} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
