import { profile } from "../api";
import apiConnector from "../apiConnector";
import { setLoading } from "../../slices/userSlice";
import { setUserData } from "../../slices/userSlice";
import { toast } from "react-hot-toast";

export function updateProfileImg(token, file) {
  return async (dispatch) => {
    const toastId = toast.loading("uploading....");
    dispatch(setLoading(true));

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await apiConnector("POST", profile.change_dp, formData, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("response......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success("Profile image updated successfully");
      dispatch(setUserData(response.data.data));
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }

    dispatch(setLoading(false));

    toast.dismiss(toastId);
  };
}
export function updateBackgroundImg(token, file) {
  return async (dispatch) => {
    const toastId = toast.loading("uploading....");
    dispatch(setLoading(true));

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await apiConnector("POST", profile.change_bg, formData, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("response......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success("Background image updated successfully");
      dispatch(setUserData(response.data.data));
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }

    dispatch(setLoading(false));

    toast.dismiss(toastId);
  };
}
export function updateProfileDetails(token, data) {
  return async (dispatch) => {
    const toastId = toast.loading("updating....");
    dispatch(setLoading(true));

    try {
      console.log("data : ", data);

      const response = await apiConnector(
        "POST",
        profile.update_profile,
        data,
        {
          Authorisation: `Bearer ${token}`,
        }
      );

      console.log("response......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success("Profile data updated successfully");
      dispatch(setUserData(response.data.data));
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }

    dispatch(setLoading(false));

    toast.dismiss(toastId);
  };
}
