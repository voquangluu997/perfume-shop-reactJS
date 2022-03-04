import axiosClient from "./axiosClient";
const BookingApi = {
  getAll: (params) => {
    const url = "/bookings";
    return axiosClient.get(url, { params });
  },

  add: (item) => {
    const url = `/bookings`;
    return axiosClient.post(url, item);
  },

  //   update: (item) => {
  //     const url = `/bookings`;
  //     return axiosClient.put(url, item);
  //   },

  getById: (id) => {
    const url = `/bookings/${id}`;
    return axiosClient.get(url);
  },

  delete: (id) => {
    const url = `/bookings/${id}`;
    return axiosClient.delete(url);
  },
};
export default BookingApi;
