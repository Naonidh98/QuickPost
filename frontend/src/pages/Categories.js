import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../components/common/Spinner";

import { getCategory } from "../services/operations/admin";
import { CategoryCard } from "../components/common/CategoryCard";

export const Categories = () => {
  const dispatch = useDispatch();
  const { dark_mode } = useSelector((state) => state.darkmode);
  const [loading, setLoading] = useState(false);
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    async function getCat() {
      setLoading(true);
      dispatch(getCategory(setCatData));
      console.log(catData);
      setLoading(false);
    }
    getCat();
  }, []);

  return (
    <div
      className={`${
        dark_mode ? "text-white" : "text-black"
      } w-[92%] xl:w-[1260px] mx-auto py-6`}
    >
      <h1 className="font-poppins text-4xl font-bold">Post Categories</h1>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            {catData.length === 0 ? (
              <div>No data</div>
            ) : (
              <div>
                <CategoryCard data={catData} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
