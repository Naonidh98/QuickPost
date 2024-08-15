import apiConnector from "../apiConnector";
import { auth } from "../apis";
import { toast } from "react-hot-toast";
import { setUserData, setUserToken } from "../../slices/userSlice";

//sign up handler
export function registerEmail(data) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", auth.register, data);

      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastId);
  };
}

//email verification
export function emailVerification(data) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const url =
        auth.email_verification + "/" + data?.email + "/" + data?.token;

      const response = await apiConnector("POST", url, {});

      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastId);
  };
}

//resend verification token
export function resendEmailVerification(data) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        auth.resend_verify_token,
        data
      );

      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastId);
  };
}

//login
export function login(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", auth.login, data);
      //console.log(response);

      if (response?.data?.success === true) {
        dispatch(setUserData(response?.data?.user));
        localStorage.setItem("user", JSON.stringify(response?.data?.user));

        dispatch(setUserToken(response?.data?.token));
        localStorage.setItem("token", JSON.stringify(response?.data?.token));

        toast.success(response?.data?.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastId);
  };
}

//logout
export function logout(navigate) {
  return async (dispatch) => {
    try {
      dispatch(setUserData(null));
      localStorage.removeItem("user");

      dispatch(setUserToken(null));
      localStorage.removeItem("token");

      toast.success("User logout");

      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };
}

//forgot - password

