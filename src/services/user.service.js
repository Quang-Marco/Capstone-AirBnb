import { http } from "./config";

export const userService = {
  getAllUser: () => http.get("/users"),
  postUser: (token, data) =>
    http.post("/users", data, {
      headers: {
        token,
      },
    }),
  deleteUser: (token, id) =>
    http.delete(`/users?id=${id}`, {
      headers: {
        token,
      },
    }),
  uploadAvatar: (token, data) =>
    http.post("/users/upload-avatar", data, {
      headers: {
        token,
      },
    }),
  getUserById: (id) => http.get(`/users/${id}`),
  updateUser: (token, id, data) =>
    http.put(`/users/${id}`, data, {
      headers: {
        token,
      },
    }),
};
