const BASE_URL = "http://localhost:8800/api/v1";

export const auth = {
  login: BASE_URL + "/login",
  register: BASE_URL + "/register",
  email_verification : BASE_URL + "/emailVerification",
  resend_verify_token : BASE_URL + "/email/verify/resend",
  validate_token : BASE_URL + "/token/verify"
};
