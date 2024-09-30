import { http } from "./config";

export const phongThueService = {
  getRooms: () => http.get(`/phong-thue`),

  getLocationRooms: (maViTri) =>
    http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`),
};
