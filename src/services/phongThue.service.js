import { http } from "./config";

export const phongThueService = {
  getRooms: () => http.get(`/phong-thue`),
  postRoom: (data) => http.post("/phong-thue", data),
  deleteRoom: (id) => http.delete(`/phong-thue?id=${id}`),
  // uploadRoomImage: (token, data) =>
  //   http.post("/phong-thue/upload-hinh-phong", data, {
  //     headers: {
  //       token,
  //     },
  //   }),
  getRoomById: (id) => http.get(`/phong-thue/${id}`),
  updateRoom: (token, id, data) =>
    http.put(`/phong-thue/${id}`, data, {
      headers: {
        token,
      },
    }),
};
