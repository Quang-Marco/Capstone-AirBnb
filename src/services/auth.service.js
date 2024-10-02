import { http } from "./config";

export const authService = {
  signup: (user) => http.post(`/auth/signup`, user),

  signin: (user) => http.post(`/auth/signin`, user),
};
