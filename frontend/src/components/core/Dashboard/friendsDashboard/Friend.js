import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../../common/Spinner";
import { useForm } from "react-hook-form";
import { findUser } from "../../../../services/operations/client";
import { AccountCard } from "./AccountCard";
import { getUserConnections } from "../../../../services/operations/client";



export const Friend = () => {
  const dispatch = useDispatch();
  const { dark_mode } = useSelector((state) => state.darkmode);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [showConnection, setShowConnection] = useState(true);
  const [connData, setConnData] = useState([]);
  const [searchAccount, setSearchAccount] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  //console.log("fetchData : ", fetchedData);

  useEffect(() => {

    dispatch(getUserConnections(token,setLoading,setConnData))

  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitHandler(data) {
    console.log("search", data);
    dispatch(
      findUser(data, token, setLoading, setSearchAccount, setFetchedData)
    );
  }

  return (
    <div
      className={`${
        dark_mode ? "text-white" : "text-black"
      } mx-auto w-11/12 max-w-[1000px] py-10`}
    >
      <h2 className="text-3xl font-poppins font-bold pt-12 sm:pt-0">Friend</h2>
      <form
        className={`flex justify-between my-1 ${
          dark_mode ? "" : "border-2 border-black"
        }`}
        onSubmit={handleSubmit(submitHandler)}
      >
        <input
          type="text"
          className="w-11/12 text-xl px-4 text-black outline-none"
          placeholder="Enter accout username or first/last name"
          {...register("data", { required: true })}
        />
        <button className="w-[100px] clear-start py-4 px-2 bg-yellow-50 text-black font-poppins font-bold text-xl">
          Enter
        </button>
      </form>
      {errors.data && <div className="w-full">Required</div>}

      <div>
        {loading ? (
          <div><Spinner/></div>
        ) : (
          <div>
            {searchAccount ? (
              <div>
                {fetchedData?.length === 0 ? (
                  <div>No such account found</div>
                ) : (
                  <div>
                    <AccountCard data={fetchedData} />
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-8">
                <div className="w-full">
                  <div
                    className={`w-[100%] p-4 text-lg font-bold text-center cursor-pointer`}
                  >
                    My Connections
                  </div>

                  <div>{loading ? <Spinner /> : <div>
                    
                    <AccountCard data={connData}/>

                    </div>}</div>
                </div>
                {/* list of account */}
                <div></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
