const BASE_URL = "http://localhost:8800/api/v1";

export const auth = {
  login: BASE_URL + "/login",
  register: BASE_URL + "/register",
  email_verification: BASE_URL + "/emailVerification",
  resend_verify_token: BASE_URL + "/email/verify/resend",
  validate_token: BASE_URL + "/token/verify",
};

export const user = {
  edit_user: BASE_URL + "/update-user",
  frnd_request: BASE_URL + "/get-friend-request",
  send_req: BASE_URL + "/send/friend-request",
  accept_req: BASE_URL + "/accept-request",
  reject_req: BASE_URL + "/reject-request",
  suggested_frnd: BASE_URL + "/suggested/account",
  search_query: BASE_URL + "/search/query",
  user_frnds  : BASE_URL + "/get-My-friends",
  reset_password : BASE_URL + "/reset"
};

export const post = {
  create_post: BASE_URL + "/post/create",
  delete_post: BASE_URL + "/post/delete",
  home_post: BASE_URL + "/post/home",
  like_post: BASE_URL + "/post/like",
  comment_create: BASE_URL + "/post/comment",
};
