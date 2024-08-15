import toast from "react-hot-toast";
import apiConnector from "../apiConnector";
import { user } from "../apis";
import { setUserData } from "../../slices/userSlice";

//update user
export function updateUser(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const data2 = new FormData();

      if (data.profileImg) {
        data2.append("profileImg", data.profileImg);
      }
      if (data.firstName) {
        data2.append("firstName", data.firstName);
      }
      if (data.lastName) {
        data2.append("lastName", data.lastName);
      }
      if (data.location) {
        data2.append("location", data.location);
      }
      if (data.profession) {
        data2.append("profession", data.profession);
      }

      const response = await apiConnector("POST", user.edit_user, data2, {
        Authorisation: `Bearer ${token}`,
      });

      if (response?.data?.success === true) {
        dispatch(setUserData(response?.data?.user));
        localStorage.setItem("user", JSON.stringify(response?.data?.user));

        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastId);
  };
}

//frnd req
export function getFrndRequests(token, setRequests) {
  return async (dispatch) => {
    //const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        user.frnd_request,
        {},
        {
          Authorisation: `Bearer ${token}`,
        }
      );
      if (response?.data?.success === true) {
        setRequests(response?.data?.data);
        //  toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    // toast.dismiss(toastId);
  };
}
//suggested frnd
export function getSuggestedfrnd(token, setSuggestedFriends) {
  return async (dispatch) => {
    //const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        user.suggested_frnd,
        {},
        {
          Authorisation: `Bearer ${token}`,
        }
      );
      if (response?.data?.success === true) {
        setSuggestedFriends(response?.data?.data);
        //  toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    // toast.dismiss(toastId);
  };
}

//send request
export function sendFriendRequest(reqTo, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        user.send_req,
        { requestTo: reqTo },
        {
          Authorisation: `Bearer ${token}`,
        }
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

//accept req
export function acceptFriendRequest(data, token, setRequests, setFrnds) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", user.accept_req, data, {
        Authorisation: `Bearer ${token}`,
      });
      console.log(response);

      if (response?.data?.success === true) {
        setRequests(response?.data?.data);
        setFrnds(response?.data?.data2);
        toast.success(response?.data?.message);
        //window.location.reload();
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastId);
  };
}

//reject-req
export function rejectFriendRequest(data, token, setRequests) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", user.reject_req, data, {
        Authorisation: `Bearer ${token}`,
      });
      console.log(response);
      if (response?.data?.success === true) {
        setRequests(response?.data?.data);
        toast.success(response?.data?.message);
        //window.location.reload();
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastId);
  };
}

//search query
export function searchQueryHandler(data, token, setData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", user.search_query, data, {
        Authorisation: `Bearer ${token}`,
      });
      console.log(response);
      if (response?.data?.success === true) {
        setData(response?.data?.data);

        toast.success(response?.data?.message);
        //window.location.reload();
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastId);
  };
}

//my frnds
//frnd req
export function getMyfrnds(token, setFrnds) {
  return async (dispatch) => {
    //const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        user.user_frnds,
        {},
        {
          Authorisation: `Bearer ${token}`,
        }
      );
      if (response?.data?.success === true) {
        setFrnds(response?.data?.data);
        //  toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    // toast.dismiss(toastId);
  };
}

//resetPassword
export function resetPasswordUser(data, email, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const url = user.reset_password + "/" + email + "/" + token;

      const response = await apiConnector("POST", url, data);

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
