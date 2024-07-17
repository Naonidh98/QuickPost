import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Spinner } from "./../components/common/Spinner";
import { getSearchCategoryPost } from "../services/operations/client";
import { PostCard } from "../components/core/Feed/PostCard";
export const CategoryPost = () => {
  const para = useParams();
  const dispatch = useDispatch();

  const { dark_mode } = useSelector((state) => state.darkmode);
  const { token } = useSelector((state) => state.auth);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = {
      catName: para.id,
    };

    dispatch(getSearchCategoryPost(data, token, setLoading, setData));
  }, []);

  return (
    <div className={`${dark_mode ? "text-white" : "text-black"}`}>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {data === null ? (
            <div className="text-2xl font-bold font-poppins text-center py-5">
              No data found
            </div>
          ) : (
            <div>
              {/* Section 1 */}
              <div className="bg-richblack-900 py-8">
                <div className="w-[92%] xl:w-[1260px] mx-auto text-white">
                  <h2 className="font-bold text-4xl font-poppins">
                    {data?.title}
                  </h2>
                  <p className="py-2 text-lg">{data?.description}</p>
                </div>
              </div>

              {/*Section 2*/}
              <div className="w-[95%] max-w-[850px] mx-auto">
                {data?.postIds.map((item, index) => (
                  <PostCard key={index} data={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
