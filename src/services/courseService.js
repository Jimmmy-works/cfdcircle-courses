import axios from "axios";
import { BASE_URL } from "../constant/environment";

export const courseService = {
  getCoures(slug) {
    return axios.get(`${BASE_URL}/courses${slug ? `/${slug}` : ""}`);
  },
  getTeams() {
    return axios.get(`${BASE_URL}/teams`);
  },

  getQuestions() {
    return axios.get(`${BASE_URL}/questions?page=1&limit=6`);
  },
};
