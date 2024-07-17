import toast from "react-hot-toast";
import apiConnector from "../apiConnector";

import { category, admin } from "../api";
import { setLoading } from "../../slices/postSlice";

export function getCategory(setCatData) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", category.get_Category);

      // console.log("data : ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      setCatData(response.data.data);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
    dispatch(setLoading(false));
  };
}

export function getAdminData(token, setLoading, setData) {
  return async (dispatch) => {
    const toastId = toast.loading("loading....");
    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        admin.fetch_data,
        {},
        {
          Authorisation: `Bearer ${token}`,
        }
      );

      console.log("response......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      setData(response.data.data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
    setLoading(false);
    toast.dismiss(toastId);
  };
}

export function createCategory(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("loading....");

    try {
      const response = await apiConnector("POST", admin.category_create, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("response......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }

    toast.dismiss(toastId);
  };
}
