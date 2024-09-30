import { http } from "./config";

export const viTriService = {
  getViTri: () => http.get("/vi-tri"),
  postVitri: (data) => http.post("/vi-tri", data),
  deleteViTri: (id) => http.delete(`/vi-tri?id=${id}`),
  uploadAvatar: (token, data) =>
    http.post("/vi-tri/upload-hinh-vitri", data, {
      headers: {
        token,
      },
    }),
  getViTriById: (id) => http.get(`/vi-tri/${id}`),
  updateViTri: (id, data) => http.put(`/vi-tri/${id}`, data),
};
