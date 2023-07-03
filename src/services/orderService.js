import axios from "axios";
import { BASE_URL } from "../constant/environment";

export const orderService = {
  getCourseHistory(token = "") {
    return axios.get(`${BASE_URL}/orders/courses/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getPaymentHistory(token = "") {
    return axios.get(`${BASE_URL}/orders/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  orderCourse(payload = {}, token = "") {
    return axios.post(`${BASE_URL}/orders`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
