import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../../services/authService";
import { message } from "antd";
import { LOCAL_STORAGE } from "../../constant/localstorage";
import { useNavigate } from "react-router-dom";
import { orderService } from "../../services/orderService";
const AuthenContext = createContext({});
export function AuthenProvider({ children }) {
  const [isAuthenModalOpen, setIsAuthenModalOpen] = useState(false);
  const [renderForm, setRenderForm] = useState("login");
  const [profileInfo, setProfileInfo] = useState({});
  const [errors, setErrors] = useState({});
  // modal success in contact page
  const [isToastContact, setIsToastContact] = useState(false);
  // order course
  const [courseOrder, setCourseOrder] = useState([]);
  const [coursePayment, setCoursePayment] = useState([]);
  // Header
  const [dropDown, setDropDown] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);

  const handleNavbar = () => {
    if (!!toggleNav) {
      setToggleNav(!toggleNav);
      document.body.setAttribute("class", "");
    } else {
      setToggleNav(!toggleNav);
      document.body.setAttribute("class", "menu-show");
    }
  };
  // Navigate
  const navigate = useNavigate();
  // Token
  // Open Modal
  const openAuthenModal = () => {
    if (!!!localStorage.getItem(LOCAL_STORAGE.token)) {
      setIsAuthenModalOpen(true);
    }
  };
  // Close Modal
  const closeAuthenModal = () => {
    setIsAuthenModalOpen(false);
    setRenderForm("login");
    setErrors({});
  };
  const onGetCourseHistory = async () => {
    const token = localStorage.getItem(LOCAL_STORAGE.token);
    const resCoursehistory = await orderService.getCourseHistory(token);
    if (resCoursehistory?.data?.data) {
      const courseHistory = resCoursehistory?.data?.data?.orders;
      setCourseOrder(courseHistory || []);
    }
  };
  const onGetCoursePayment = async () => {
    const token = localStorage.getItem(LOCAL_STORAGE.token);
    const resCoursePayment = await orderService.getPaymentHistory(token);
    if (resCoursePayment?.data?.data) {
      const coursePayment = resCoursePayment?.data?.data.orders;
      setCoursePayment(coursePayment || []);
    }
  };
  // handle onGetProfile
  const onGetProfile = async () => {
    const token = localStorage.getItem(LOCAL_STORAGE.token);
    const resProfile = await authService.getProfile(token);
    try {
      if (resProfile?.data?.data) {
        setProfileInfo(resProfile?.data?.data);
        // close Modal
        closeAuthenModal();
      }
    } catch (error) {
      console.log("error", error);
      message.error(`Dữ liệu lỗi, không thể truy cập trang cá nhân`);
      handleLogOut();
    }
  };
  const handleLogin = async (loginData) => {
    try {
      const res = await authService.login(loginData);
      const { token, refreshToken } = res?.data?.data || {};
      // Localstorage
      localStorage.setItem(LOCAL_STORAGE.token, token);
      localStorage.setItem(LOCAL_STORAGE.refreshToken, refreshToken);
      // lấy thông tin profile
      if (!!token) {
        onGetProfile();
        onGetCourseHistory();
        onGetCoursePayment();
        // message
        message.success("Đăng nhập thành công");
        // closeAuthenModal();
      }
    } catch (error) {
      message.error("Đăng nhập thất bại");
      console.log("error", error);
    }
  };
  const handleRegister = async (registerData) => {
    try {
      const res = await authService.register(registerData);
      if (res?.data?.data?.id) {
        message.success("Đăng kí thành công");
        handleLogin({
          email: registerData?.email || "",
          password: registerData?.password || "",
        });
        // close Modal
        closeAuthenModal();
      }
    } catch (error) {
      message.error("Đăng kí thất bại");
      console.log("error", error);
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem(LOCAL_STORAGE.token);
    localStorage.removeItem(LOCAL_STORAGE.refreshToken);
    setProfileInfo({});
    setCourseOrder([]);
    setCoursePayment([]);
    navigate("/");
    message.success("Bạn đã đăng xuất thành công");
  };
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE.token);
    if (token) {
      onGetProfile();
      onGetCoursePayment();
      onGetCourseHistory();
    }
  }, []);
  return (
    <AuthenContext.Provider
      value={{
        setIsAuthenModalOpen,
        isAuthenModalOpen,
        closeAuthenModal,
        openAuthenModal,
        handleLogin,
        handleRegister,
        renderForm,
        setRenderForm,
        profileInfo,
        setProfileInfo,
        handleLogOut,
        isToastContact,
        setIsToastContact,
        errors,
        setErrors,
        courseOrder,
        coursePayment,
        setCourseOrder,
        setCoursePayment,
        // navbar
        dropDown,
        setDropDown,
        toggleNav,
        setToggleNav,
        handleNavbar,
        onGetCourseHistory,
        onGetCoursePayment,
      }}
    >
      {children}
    </AuthenContext.Provider>
  );
}

export const useAuthen = () => useContext(AuthenContext);
