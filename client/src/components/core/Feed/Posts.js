import React, { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { getPostHome } from "../../../services/operations/client";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../common/Spinner";

export const Posts = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getPosts() {
      dispatch(getPostHome(token, setLoading, setData));
    }
    getPosts();
  }, []);

  return (
    <div className="w-[95%] max-w-[850px] mx-auto">
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          {data.length === 0 ? (
            <div>No posts select a category</div>
          ) : (
            <div>
              {data.map((item, index) => (
                <PostCard data={item} key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
