import axiosClient from "./axiosClient";
const userApi = {
  getProfile: () => {
    const url = "/profiles";
    return axiosClient.get(url);
  },
  updateProfile: (userInfo) => {
    const url = `/profiles`;
    return axiosClient.patch(url, userInfo);
  },
  updatePassword: (password) => {
    const url = "profiles/update-password";
    return axiosClient.patch(url, password);
  },
};
export default userApi;
