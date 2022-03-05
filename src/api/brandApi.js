import axiosClient from "./axiosClient";
// api/productApi.js
const BrandApi = {
  getAll: (params) => {
    const url = "/brands";
    return axiosClient.get(url, { params });
  },

  add: (item) => {
    const url = `/brands`;
    return axiosClient.post(url, item);
  },

  update: (item) => {
    const url = `/brands`;
    return axiosClient.put(url, item);
  },

  delete: (id) => {
    const url = `/brands/${id}`;
    return axiosClient.delete(url);
  },
};
export default BrandApi;
