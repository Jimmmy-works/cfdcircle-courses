import axios from "axios";
import { BASE_URL } from "../constant/environment";
import instance from "../components/Interceptor/Interceptor";

export const authService = {
  login(payload = {}) {
    return instance.post(`/customer/login`, payload);
  },
  register(payload = {}) {
    return instance.post(`/customer/register`, payload);
  },
  getProfile(token = "") {
    return instance.get(`/customer/profiles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  putRefreshToken(token = "") {
    // console.log("token", token);
    return instance.put(`/customer/refresh`, {
      refreshToken: token,
    });
  },
  uploadProfile(payload = {}, token = "") {
    return instance.put(`/customer/profiles`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
