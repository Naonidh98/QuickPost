import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminData } from "../../../services/operations/admin";
import DataChart from "./DataChart";
export const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { dark_mode } = useSelector((state) => state.darkmode);

  useEffect(() => {
    async function fetchData() {
      dispatch(getAdminData(token, setLoading, setData));
      console.log(data);
    }
    fetchData();
  }, []);

  return (
    <div
      className={`w-[90%] xl:w-[1260px] mx-auto ${
        dark_mode ? "text-white" : "text-black"
      }`}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* User chart */}
          <div>
            <h2>Users : </h2>
            <DataChart
              label={["Admin", "Client"]}
              value={[data.totalAdmin, data.totalClient]}
            />
          </div>
          {/* Post chart */}
          <div>
            <h2>Post : </h2>
            <DataChart
              label={["Draft", "Publish"]}
              value={[data.totalDraftPost, data.totalPublishPost]}
            />
          </div>
        </div>
      )}
    </div>
  );
};
