import axiosClient from "./axiosClient";
// api/productApi.js
const FragranceApi = {
  getAll: (params) => {
    const url = "/fragrances";
    return axiosClient.get(url, { params });
  },

  add: (item) => {
    const url = `/fragrances`;
    return axiosClient.post(url, item);
  },

  update: (item) => {
    const url = `/fragrances`;
    return axiosClient.put(url, item);
  },

  delete: (id) => {
    const url = `/fragrances/${id}`;
    return axiosClient.delete(url);
  },
};
export default FragranceApi;
