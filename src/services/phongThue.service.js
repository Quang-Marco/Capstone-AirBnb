import { http } from "./config";

export const phongThueService = {
  getRooms: () => http.get(`/phong-thue`),

  getRoomsFromLocation: (maViTri) =>
    http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`),

  getRoomsFromId: (id) => http.get(`/phong-thue/{id}`),
};
