import React, { useEffect, useState } from "react";
import { TopBar } from "../components";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchQueryHandler } from "../services/operations/userAPI";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Loading } from "../components/index";
import { BsPersonFillAdd, BsFiletypeGif } from "react-icons/bs";
import { sendFriendRequest } from "../services/operations/userAPI";

const SearchResult = () => {
  const [data, setData] = useState([]);
  const { token, user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  //console.log(params);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(searchQueryHandler({ query: params.query }, token, setData));
    console.log(data);
    setLoading(false);
  }, []);

  return (
    <div className="bg-richblack-900 w-screen h-screen">
      {/* wrapper */}
      <div className="w-[98%] max-w-[1280px] mx-auto">
        <Link to={"/"}>
          <div className="text-white sm:text-2xl md:text-4xl py-4">
            <IoIosArrowDropleftCircle />
          </div>
        </Link>

        <div className="text-white/80 text-lg  sm:text-2xl mt-2 md:mt-4 italic">
          <p>{`Search result for  : ${params.query}`}</p>
        </div>

        <div className="text-white mt-[15px] md:mt-[25px]">
          {loading ? (
            <Loading />
          ) : (
            <div>
              {data.length > 0 ? (
                <div className="flex flex-col gap-3 md:gap-[35px] w-[100%] md:max-w-[450px] mx-auto">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-center bg-richblack-800 py-2 px-4 rounded"
                    >
                      <div className="">
                        <img
                          src={item.profileUrl}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-medium">
                          {`${item?.firstName} ${item?.lastName}`}
                        </p>
                        <span className="text-sm">
                          {item?.profession ?? "No Profession"}
                        </span>
                      </div>

                      <div
                        className="text-xl"
                        onClick={() => {
                          dispatch(sendFriendRequest(item._id, token));
                        }}
                      >
                        <BsPersonFillAdd />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>No result found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
