import { http } from "./config";

export const datPhongService = {
  getPhongDaDat: () => http.get(`/dat-phong`),
  deleteRoom: (id) => http.delete(`/dat-phong?id=${id}`),
  getRoomById: (id) => http.get(`/dat-phong/${id}`),
  updateRoomBooked: (id, data) => http.put(`/dat-phong/${id}`, data),
  postRoomBooked: (data) => http.post("/dat-phong", data),
};
