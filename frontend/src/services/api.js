const BASE_URL = 'https://deploy-quickpost-api.vercel.app/api/v1'
export const auth = {
  signup: BASE_URL + "/auth/signup",
  login: BASE_URL + "/auth/login",
  verifyEmail: BASE_URL + "/auth/sendotp",
  resetPasswordToken: BASE_URL + "/auth/reset-password-token",
  resetPassword: BASE_URL + "/auth/reset-password",
};

export const profile = {
  change_dp: BASE_URL + "/user/profile/dp-update",
  change_bg: BASE_URL + "/user/profile/bg-update",
  update_profile: BASE_URL + "/user/profile/profile-update",
};

export const category = {
  get_Category: BASE_URL + "/admin/category/all",
  create_Category: BASE_URL + "/admin/category/create",
  add_category : BASE_URL + "/user/profile/category/add",
  remove_category : BASE_URL + "/user/profile/category/remove",
};

export const post = {
  create_Post: BASE_URL + "/post/create",
  update_Post: BASE_URL + "/post/update",
  upload_Image: BASE_URL + "/post/addMedia",
  delete_Image: BASE_URL + "/post/removeMedia",
  upload_Video: BASE_URL + "/post/addVideoMedia",
  delete_Video: BASE_URL + "/post/removeMedia",
  publish_post: BASE_URL + "/post/publish",
  draft_post: BASE_URL + "/post/draft",
  fetch_user_posts: BASE_URL + "/post/all",
  get_category_post : BASE_URL + "/post/category/pos",
  get_home_feed_post : BASE_URL + "/post/public",
  like_post : BASE_URL + "/post/like",
  dislike_post : BASE_URL + "/post/dislike",
  remove_image_post : BASE_URL + "/post/removeMedia",
  delete_post : BASE_URL + "/post/delete",
};

export const account = {
  search_account: BASE_URL + "/user/profile/find",
  accout_details: BASE_URL + "/user/profile/detail",
};

export const connection = {
  send_req: BASE_URL + "/user/req/send",
  accept_req: BASE_URL + "/user/req/accept",
  reject_req: BASE_URL + "/user/req/reject",
  all_req: BASE_URL + "/user/req/all",
  find_connections : BASE_URL + "/user/req/followers/all"
};

export const admin={
  fetch_data : BASE_URL + "/admin/data",
  category_create : BASE_URL + "/admin/category/create",
}