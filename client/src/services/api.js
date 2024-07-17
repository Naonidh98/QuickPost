export const auth = {
  signup: "/auth/signup",
  login: "/auth/login",
  verifyEmail: "/auth/sendotp",
  resetPasswordToken: "/auth/reset-password-token",
  resetPassword: "/auth/reset-password",
};

export const profile = {
  change_dp: "/user/profile/dp-update",
  change_bg: "/user/profile/bg-update",
  update_profile: "/user/profile/profile-update",
};

export const category = {
  get_Category: "/admin/category/all",
  create_Category: "/admin/category/create",
  add_category: "/user/profile/category/add",
  remove_category: "/user/profile/category/remove",
};

export const post = {
  create_Post: "/post/create",
  update_Post: "/post/update",
  upload_Image: "/post/addMedia",
  delete_Image: "/post/removeMedia",
  upload_Video: "/post/addVideoMedia",
  delete_Video: "/post/removeMedia",
  publish_post: "/post/publish",
  draft_post: "/post/draft",
  fetch_user_posts: "/post/all",
  get_category_post: "/post/category/pos",
  get_home_feed_post: "/post/public",
  like_post: "/post/like",
  dislike_post: "/post/dislike",
  remove_image_post: "/post/removeMedia",
  delete_post: "/post/delete",
};

export const account = {
  search_account: "/user/profile/find",
  accout_details: "/user/profile/detail",
};

export const connection = {
  send_req: "/user/req/send",
  accept_req: "/user/req/accept",
  reject_req: "/user/req/reject",
  all_req: "/user/req/all",
  find_connections: "/user/req/followers/all",
};

export const admin = {
  fetch_data: "/admin/data",
  category_create: "/admin/category/create",
};
