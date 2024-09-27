import { http } from "./config";

export const viTriService = {
  getLocations: () => http.get("/vi-tri"),
};
