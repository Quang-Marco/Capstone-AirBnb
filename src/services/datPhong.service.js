import { http } from "./config";

export const datPhongService = {
  getPhongDaDat: () => http.get(`/dat-phong`),
  bookRoom: (data) => http.post("/dat-phong", data),
};
