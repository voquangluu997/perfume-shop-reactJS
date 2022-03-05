import axiosClient from "./axiosClient";
const reviewApi = {
  getAll: (id, params) => {
    const url = `/reviews/${id}`;
    return axiosClient.get(url, { params });
  },
  add: (review) => {
    const url = `/reviews`;
    return axiosClient.post(url, review);
  },
};
export default reviewApi;
