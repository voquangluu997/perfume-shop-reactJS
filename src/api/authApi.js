import axios from "axios";
import axiosClient from "./axiosClient";
const authApi = {
  login: (info) => {
    const url = "/auth/login";
    return axiosClient.post(url, info);
  },

  loginGoogle: () => {
    const url = "/auth/google";
    return axiosClient.get(url);
  },

  loginFacebook: () => {
    const url = "/auth/facebook";
    return axiosClient.get(url);
  },

  sendMailResetPassword: (email) => {
    const url = "/auth/reset_password";
    return axiosClient.post(url, email);
  },
  resetPassword: (token, password) => {
    const url = `auth/reset_password/${token}`;
    return axiosClient.patch(url, password);
  },
};
export default authApi;
