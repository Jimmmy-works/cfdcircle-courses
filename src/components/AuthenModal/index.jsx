import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { authService } from "../../services/authService";
import { useAuthen } from "../AuthenContext";
import ReactDOM from "react-dom";
export default function AuthenModal() {
  const { isAuthenModalOpen, closeAuthenModal } = useAuthen();

  return ReactDOM.createPortal(
    <div className={`modal modallogin ${isAuthenModalOpen ? "open" : ""}`}>
      <div className="modal__wrapper">
        <div onClick={closeAuthenModal} className="modal__wrapper-close">
          <img src="/img/close_icon.svg" alt="CFD Register" />
        </div>
        <LoginForm />
        <RegisterForm />
        {/* <div className="modal__wrapper-content mdconsult">
          <h3 className="title --t3">Đăng ký tư vấn</h3>
          <form action="#" className="form">
            <input
              type="text"
              className="form__input"
              name="name"
              placeholder="Họ và tên"
            />
            <input
              type="text"
              className="form__input"
              name="name"
              placeholder="Số điện thoại"
            />
            <input
              type="text"
              className="form__input"
              name="email"
              placeholder="Email"
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="4"
              className="form__input"
              placeholder="Nội dung cần tư vấn"
            ></textarea>
            <button
              className="btn btn--primary form__btn-register"
              type="submit"
            >
              Gửi thông tin
            </button>
          </form>
        </div> */}
      </div>
      <div onClick={closeAuthenModal} className="modal__overlay"></div>
    </div>,
    document.body
  );
}
