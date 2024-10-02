import { http } from "./config";

export const datPhongService = {
  getBookedRooms: () => http.get(`/dat-phong`),

  postBookedRoom: (data) => http.post(`/dat-phong`, data),

  updateBookedRoom: (id, newData) => http.put(`/dat-phong/${id}`, newData),

  deleteBookedRoom: (id) => http.delete(`/dat-phong/${id}`),

  getBookedRoomsById: (id) => http.get(`/dat-phong/${id}`),

  getBookedRoomsByUser: (maNguoiDung) =>
    http.get(`/dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`),
  getBookedRooms: () => http.get(`/dat-phong`),

  postBookedRoom: (data) => http.post(`/dat-phong`, data),

  updateBookedRoom: (id, newData) => http.put(`/dat-phong/${id}`, newData),

  deleteBookedRoom: (id) => http.delete(`/dat-phong/${id}`),

  getBookedRoomsById: (id) => http.get(`/dat-phong/${id}`),

  getBookedRoomsByUser: (maNguoiDung) =>
    http.get(`/dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`),
  getPhongDaDat: () => http.get(`/dat-phong`),
  deleteRoom: (id) => http.delete(`/dat-phong?id=${id}`),
  getRoomById: (id) => http.get(`/dat-phong/${id}`),
  updateRoomBooked: (id, data) => http.put(`/dat-phong/${id}`, data),
  postRoomBooked: (data) => http.post("/dat-phong", data),
};
