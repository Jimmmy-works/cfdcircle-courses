import { message } from "antd";
import { BASE_URL } from "../../constant/environment";

const instance = axios.create({
  baseURL: BASE_URL,
});

// Interceptor cho phép can thiệp vào quá trình nhận phản hồi (RESPONSE) từ server.
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Nếu mã lỗi là 401 hoặc 403
    if (error.response.status === 401 || error.response.status === 403) {
      try {
        // Gọi API để cập nhật token mới
        const { data } = await axios.post("/refresh_token", {
          refreshToken: localStorage.getItem("refreshToken"),
        });

        // Lưu lại token mới vào local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);

        // Thay đổi token trong header của yêu cầu ban đầu
        originalRequest.headers.Authorization = `Bearer ${data.token}`;

        // Gọi lại yêu cầu ban đầu với token mới
        return instance(originalRequest);
      } catch (error) {
        console.log(error);
        // Xử lý lỗi nếu không thể cập nhật token mới
        // Ví dụ: chuyển hướng người dùng đến trang login
      }
    }

    // Nếu lỗi không phải là 401 hoặc 403, trả về lỗi ban đầu
    return Promise.reject(error);
  }
);

// Interceptor cho phép can thiệp vào quá trình gửi yêu cầu (REQUEST) từ server.
instance.interceptors.request.use(
  (config) => {
    // xử lý yêu cầu trước khi gửi đi
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    // xử lý lỗi nếu có
    message.error("data error");
    // navigate
    return Promise.reject(error);
  }
);

export default instance;
