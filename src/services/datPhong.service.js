import { http } from "./config";

export const datPhongService = {
  getBookedRooms: () => http.get(`/dat-phong`),

  getBookedRoomsFromUser: (maNguoiDung) =>
    http.get(`/dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`),
};
