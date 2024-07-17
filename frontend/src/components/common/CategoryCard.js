import React from "react";
import { IoIosAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { addCategoryUser } from "../../services/operations/client";
import { removeCategoryUser } from "../../services/operations/client";

export const CategoryCard = ({ data }) => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  console.log(user);

  return (
    <div className="my-4 flex flex-wrap gap-[25px] gap-y-4">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className={`flex  items-center gap-6 ${
              user.categoriesLiked.includes(item._id)
                ? "bg-pink-200"
                : "border-2 border-white"
            } text-2xl py-2 px-4 rounded-full`}
          >
            {item.title}{" "}
            <div
              className="text-3xl font-bold cursor-pointer"
              onClick={() => {
                const data = {
                  catId: item._id,
                };

                if (user.categoriesLiked.includes(item._id)) {
                  dispatch(removeCategoryUser(data, token));
                } else {
                  dispatch(addCategoryUser(data, token));
                }
              }}
            >
              {user.categoriesLiked.includes(item._id) ? (
                <IoMdClose />
              ) : (
                <IoIosAdd />
              )}
            </div>{" "}
          </div>
        );
      })}
    </div>
  );
};
