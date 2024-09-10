import { http } from "./config";

export const phongThueService = {
  getRooms: () => http.get(`/phong-thue`),
};
