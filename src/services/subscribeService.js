import axios from "axios";
import { BASE_URL } from "../constant/environment";

export const subscribeService = {
  subscribes(payload) {
    return axios.post(`${BASE_URL}/subscribes`, payload);
  },
};
