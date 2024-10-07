import { http } from "./config";

export const commentService = {
  getComments: () => http.get(`/binh-luan`),

  postComment: (comment, token) =>
    http.post(`/binh-luan`, comment, { headers: { token } }),

  updateComment: (id, newComment, token) =>
    http.put(`/binh-luan//${id}`, newComment, { headers: { token } }),

  deleteComment: (id, token) =>
    http.delete(`/binh-luan//${id}`, { headers: { token } }),

  getCommentsByRoomId: (id) =>
    http.get(`/binh-luan/lay-binh-luan-theo-phong/${id}`),
};
