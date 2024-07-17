import toast from "react-hot-toast";
import apiConnector from "../apiConnector";

import { category, post } from "../api";
import { connection } from "../api";
import { account } from "../api";
import { setStep } from "../../slices/postSlice";
import { setPostData } from "../../slices/postSlice";
import { setUserData } from "../../slices/userSlice";
import { setEditMode } from "../../slices/postSlice";

//create post
export function createPost(token, data) {
  return async (dispatch) => {
    try {
      console.log(data);

      const response = await apiConnector("POST", post.create_Post, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("API RESPONSE : ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);

      dispatch(setPostData(response.data.data));

      dispatch(setStep(2));
    } catch (err) {
      toast.error("Failed to create Post");
      toast.error(err.message);
      console.log(err);
    }
  };
}
//update post
export function updatePost(token, data) {
  return async (dispatch) => {
    try {
      console.log(data);

      const response = await apiConnector("POST", post.update_Post, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("API RESPONSE : ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);

      dispatch(setPostData(response.data.data));
    } catch (err) {
      toast.error("Failed to create Post");
      toast.error(err.message);
      console.log(err);
    }
  };
}
//upload image
export function uploadImage(postId, image, token, ifVideo) {
  return async (dispatch) => {
    const toastId = toast.loading("uploading.....");
    try {
      const data = new FormData();

      data.append("postImage", image[0]);
      data.append("postId", postId);
      console.log("vid  : ", ifVideo);

      if (ifVideo === true) {
        data.append("ifVideo", true);
      }

      console.log(data);

      const res = await apiConnector("POST", post.upload_Image, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("Api response......", res);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      dispatch(setPostData(res.data.data));
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to upload Image");
      toast.error(err.message);
      console.log(err);
    }
    toast.dismiss(toastId);
  };
}
//remove img from post
export function removeImg(postId, image_url, token) {
  return async (dispatch) => {
    const toastId = toast.loading("loading.....");
    try {
      const data = new FormData();

      data.append("image_url", image_url);
      data.append("postId", postId);

      console.log(data);

      const res = await apiConnector("POST", post.remove_image_post, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("Api response......", res);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      dispatch(setPostData(res.data.data));
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to remove Image");
      console.log(err);
    }
    toast.dismiss(toastId);
  };
}
//post : publish
export function publishPost(postId, token, naviagte) {
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    try {
      const data = {
        postId: postId,
      };
      const res = await apiConnector("POST", post.publish_post, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("Api response......", res);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      dispatch(setPostData(null));
      dispatch(setStep(1));
      dispatch(setEditMode(false));
      naviagte("/dashboard/posts/all");
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to upload Image");
      toast.error(err.message);
      console.log(err);
    }
    toast.dismiss(toastId);
  };
}
//post : draft
export function draftPost(postId, token, naviagte) {
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    try {
      const data = {
        postId: postId,
      };
      const res = await apiConnector("POST", post.draft_post, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("Api response......", res);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      await dispatch(setPostData(null));
      dispatch(setEditMode(false));
      dispatch(setStep(1));
      naviagte("/dashboard/posts/all");

      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to upload Image");
      toast.error(err.message);
      console.log(err);
    }
    toast.dismiss(toastId);
  };
}
//category posts
export function getSearchCategoryPost(data, token, setLoading, setData) {
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    setLoading(true);
    try {
      
      const res = await apiConnector("POST", post.get_category_post, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("Api response......", res);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }
     
      setData(res.data.data);

      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to get category");
     // toast.error(err.message);
      console.log(err);
    }
    setLoading(false);
    toast.dismiss(toastId);
  };
}
//delete post
export function deletePost(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    try {
      
      const res = await apiConnector("POST", post.delete_post, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("Api response......", res);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }
    
      toast.success(res.data.message);
      window.location.reload();
    } catch (err) {
      toast.error("Failed to delete post");
      toast.error(err.message);
      console.log(err);
    }
    toast.dismiss(toastId);
  };
}

/************************************ */

//get home feed
export function getPostHome(token, setLoading, setData) {
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        post.get_home_feed_post,
        {},
        {
          Authorisation: `Bearer ${token}`,
        }
      );

      console.log("Api response......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      setData(response.data.data);

      toast.success(response.data.message);
    } catch (err) {
      toast.error("Failed to get all Posts");
      toast.error(err.message);
      console.log(err);
    }
    setLoading(false);
    toast.dismiss(toastId);
  };
}
//fetch user
export function findUser(
  item,
  token,
  setLoading,
  setSearchAccount,
  setFetchedData
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const response = await apiConnector(
        "Post",
        account.search_account,
        item,
        {
          Authorisation: `Bearer ${token}`,
        }
      );

      console.log("Api response....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      setSearchAccount(true);
      setFetchedData(response.data.data);

      toast.success(response.data.message);
    } catch (err) {
      toast.error("Failed to find user");
      toast.error(err.message);
      console.log(err);
    }
    setLoading(false);
    toast.dismiss(toastId);
  };
}
//fetch all post of a user
export function fetchUserPosts(token, setLoading, setData) {
  return async (dispatch) => {
    const toastId = toast.loading("loading....");
    setLoading(true);

    try {
      const response = await apiConnector(
        "POST",
        post.fetch_user_posts,
        {},
        {
          Authorisation: `Bearer ${token}`,
        }
      );

      console.log("response......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      setData(response.data.data);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }

    setLoading(false);

    toast.dismiss(toastId);
  };
}
//send request
export function sendRequest(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("loading....");

    try {
      const response = await apiConnector("POST", connection.send_req, data, {
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
//accept request
export function acceptSendRequest(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("loading....");

    try {
      const response = await apiConnector("POST", connection.accept_req, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("response......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.data.message);
      dispatch(setUserData(response.data.data));
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }

    toast.dismiss(toastId);
  };
}
//reject request
export function rejectSendRequest(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("loading....");

    try {
      const response = await apiConnector("POST", connection.reject_req, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("response......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.data.message);
      dispatch(setUserData(response.data.data));
      //window reload
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }

    toast.dismiss(toastId);
  };
}
//get all request
export function getAllRequest(token, setLoading, setData) {
  return async (dispatch) => {
    const toastId = toast.loading("loading....");
    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        connection.all_req,
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

//find all connections
export function getUserConnections(token, setLoading, setConnData) {
  return async (dispatch) => {
    const toastId = toast.loading("loading....");
    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        connection.find_connections,
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
      setConnData(response.data.data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
    setLoading(false);
    toast.dismiss(toastId);
  };
}

/************admin category************************* */

//add category
export function addCategoryUser(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", category.add_category, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("api response.....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);

      dispatch(setUserData(response.data.data));
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
    toast.dismiss(toastId);
  };
}

//remove category
export function removeCategoryUser(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        category.remove_category,
        data,
        {
          Authorisation: `Bearer ${token}`,
        }
      );

      console.log("api response.....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);

      dispatch(setUserData(response.data.data));
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
    toast.dismiss(toastId);
  };
}

/************************************* ***************/

/***************** post like - dislike **************/

//postLike
export function likePost(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", post.like_post, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log(response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
    toast.dismiss(toastId);
  };
}

//post dislike
export function disLikePost(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", post.dislike_post, data, {
        Authorisation: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
    toast.dismiss(toastId);
  };
}

/**************************************************** */
