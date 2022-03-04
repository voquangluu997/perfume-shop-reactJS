import axiosClient from "./axiosClient";
const userApi = {
  getUser: () => {
    const url = "/users";
    return axiosClient.get(url);
  },

  updateProfile: (userInfo) => {
    const url = `/users`;
    return axiosClient.patch(url, userInfo);
  },
  // updatePassword: (password) => {
  //   const url = "profiles/update-password";
  //   return axiosClient.patch(url, password);
  // },
};
export default userApi;
