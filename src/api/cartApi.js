import axiosClient from "./axiosClient";
// api/productApi.js
const CartApi = {
  getAll: (params) => {
    const url = "/carts";
    return axiosClient.get(url, { params });
  },

  add: (item) => {
    const url = `/carts`;
    return axiosClient.post(url, item);
  },

  update: (item) => {
    const url = `/carts`;
    return axiosClient.put(url, item);
  },

  delete: (id) => {
    const url = `/carts/${id}`;
    return axiosClient.delete(url);
  },
};
export default CartApi;
