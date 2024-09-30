import { http } from "./config";

export const userService = {
  getUsers: () => http.get(`/users`),

  postUser: (user) => http.post(`/users`, user),

  updateUser: (id, newUser) => http.put(`/users/${id}`, newUser),

  deleteUser: (id) => http.delete(`/users/${id}`),

  getUserById: (id) => http.get(`/users/${id}`),

  getUserByName: (name) => http.get(`/users/search/${name}`),

  uploadAvatar: (img, token) =>
    http.post(`/users/upload-avatar`, img, { headers: { token } }),
};

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
