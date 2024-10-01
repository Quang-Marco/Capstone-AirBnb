import { http } from "./config";

export const phongThueService = {
  getRooms: () => http.get(`/phong-thue`),
  getRoomsByLocation: (id) =>
    http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`),
  getRoomDetail: (id) => http.get(`/phong-thue/${id}`),
};
