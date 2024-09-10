import { http } from "./config";

export const datPhongService = {
  getPhongDaDat: () => http.get(`/dat-phong`),
};
