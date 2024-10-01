import { http } from "./config";

export const viTriService = {
  getLocationById: (id) => http.get(`vi-tri/${id}`),
};
