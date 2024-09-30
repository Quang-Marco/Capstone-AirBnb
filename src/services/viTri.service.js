import { http } from "./config";

export const viTriService = {
  getLocations: () => http.get("/vi-tri"),

  getLocationsFromId: (id) => http.get(`/vi-tri/${id}`),
};
