import { http } from "./config";

export const commentService = {
  getCommentById: (id) => http.get(`binh-luan/lay-binh-luan-theo-phong/${id}`),
};
