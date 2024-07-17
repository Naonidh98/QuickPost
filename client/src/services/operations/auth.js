import { toast } from "react-hot-toast";

import { setLoading, setSignUpData, setToken } from "../../slices/authSlice";
import apiConnector from "../apiConnector";
import { setUserData } from "../../slices/userSlice";

import { auth } from "../api";

export function sendOTP(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending Otp...");

    try {
      if (data.password !== data.confirmPassword) {
        toast.error("Pasword and confirm password a re not same");
        toast.dismiss(toastId);
        return;
      }

      const resData = { email: data.email };
      const response = await apiConnector("POST", auth.verifyEmail, resData);
      console.log("SENDOTP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setSignUpData(data));
      localStorage.setItem("signupdata", JSON.stringify(data));
      navigate("/verifyEmail");

      toast.success("OTP sent successfully!!");
    } catch (err) {
      console.log("error", err.message);
      toast.error(err.response.data.message);
    }
    toast.dismiss(toastId);
  };
}

export function signUp(signupdata, otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const newdata = {
        firstName: signupdata.firstName,
        lastName: signupdata.lastName,
        password: signupdata.password,
        confirmPassword: signupdata.confirmPassword,
        accountType: signupdata.accountType,
        email: signupdata.email,
        otp: otp,
      };

      console.log("Signup data : ", newdata);

      const response = await apiConnector("POST", auth.signup, newdata);
      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        console.log("hi");
        throw new Error(response.data.message);
      }
      navigate("/login");
      toast.success(response.data.message);
      localStorage.removeItem("signUpData");
    } catch (err) {
      console.log("error", err);
      toast.error(err.response.data.message);
    }
    toast.dismiss(toastId);
  };
}

export function login(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....");

    try {
      const response = await apiConnector("POST", auth.login, data);
      console.log("res : ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      localStorage.setItem("user", JSON.stringify(response.data.data));
      dispatch(setUserData(response.data.data));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      dispatch(setToken(response.data.token));

      toast.success("Login Successfull!!");
      navigate("/");
    } catch (err) {
      console.log("error : ", err);
      toast.error(err.response.data.message);
    }

    toast.dismiss(toastId);
  };
}

export function resetPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....");

    try {
      const data = { email: email };

      const response = await apiConnector(
        "POST",
        auth.resetPasswordToken,
        data
      );
      console.log("res : ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      setEmailSent(true);
      toast.success("Reset password  mail is sent to your mail");
    } catch (err) {
      console.log("error : ", err);
      toast.error(err.response.data.message);
    }

    toast.dismiss(toastId);
  };
}

export function setresetPassword(formData, token, setPassUpdated) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....");

    try {
      const data = {
        token: token,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      const response = await apiConnector("POST", auth.resetPassword, data);
      console.log("res : ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setPassUpdated(true);
      toast.success(response.data.message);
    } catch (err) {
      console.log("error : ", err);
      toast.error(err.response.data.message);
    }

    toast.dismiss(toastId);
  };
}

export function logout() {
  return async (dispatch) => {
    const toastId = toast.loading("loading...");

    try {

      dispatch(setToken(null));
      dispatch(setUserData(null));

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      //window.location.reload();

    } catch (err) {
      console.log("error : ", err);
      toast.error("Failed to logout");
    }

    toast.dismiss(toastId);
  };
}
