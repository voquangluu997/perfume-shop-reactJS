import axiosClient from "./axiosClient";
// api/productApi.js
const bookApi = {
  getAll: (params) => {
    const url = "/perfumes";
    return axiosClient.get(url, { params });
  },
  getById: (id) => {
    const url = `/perfumes/${id}`;
    return axiosClient.get(url);
  },
  update: (id, perfume) => {
    const url = `/perfumes/${id}`;
    return axiosClient.patch(url, perfume);
  },

  add: (perfume) => {
    const url = `/perfumes`;
    return axiosClient.post(url, perfume);
  },
  delete: (id) => {
    const url = `/perfumes/${id}`;
    return axiosClient.delete(url);
  },
};
export default bookApi;
