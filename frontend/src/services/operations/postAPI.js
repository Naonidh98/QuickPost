import apiConnector from "../apiConnector";
import { post } from "../apis";
import { toast } from "react-hot-toast";

//create post
export function createPost(data, token, setLoading, setPosts) {
  return async (dispatch) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    try {
      const data2 = new FormData();

      if (data?.description) {
        data2.append("description", data?.description);
      }
      if (data?.image) {
        data2.append("image", data?.image);
      }

      const response = await apiConnector("POST", post.create_post, data2, {
        Authorisation: `Bearer ${token}`,
      });

      console.log(response);

      if (response?.data?.success === true) {
        setPosts(response?.data?.data);
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastId);
    setLoading(false);
  };
}

//get posts
export function getAllPostsHome(token, setLoading, setPosts) {
  return async (dispatch) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        post.home_post,
        {},
        {
          Authorisation: `Bearer ${token}`,
        }
      );

      //console.log("home posts res : ", response);

      if (response?.data?.success === true) {
        setPosts(response?.data?.data);
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastId);
    setLoading(false);
  };
}

//todo : delete post
export function deletePost(token, data) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", post.delete_post, data, {
        Authorisation: `Bearer ${token}`,
      });

      //console.log("home posts res : ", response);

      if (response?.data?.success === true) {
        window.location.reload();
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastId);
  };
}

//like post
export function likePostHandler(token, data, setData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", post.like_post, data, {
        Authorisation: `Bearer ${token}`,
      });

      //console.log("home posts res : ", response);

      if (response?.data?.success === true) {
        setData(response?.data?.data);
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastId);
  };
}

//comment handler
export function commentPostHandler(token, data, setData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      console.log(data);

      const response = await apiConnector("POST", post.comment_create, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("home posts res : ", response);

      if (response?.data?.success === true) {
        setData(response?.data?.data);
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastId);
  };
}
