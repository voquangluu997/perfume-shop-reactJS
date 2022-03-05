import axiosClient from "./axiosClient";
const BookingApi = {
  getAllAdmin: (params) => {
    const url = "/bookings/ad";
    return axiosClient.get(url, { params });
  },
  getAll: (params) => {
    const url = "/bookings";
    return axiosClient.get(url, { params });
  },

  add: (item) => {
    const url = `/bookings`;
    return axiosClient.post(url, item);
  },

  approveOrder: (id, filter) => {
    const url = `/bookings/ad/${id}`;
    return axiosClient.patch(url, filter);
  },

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
