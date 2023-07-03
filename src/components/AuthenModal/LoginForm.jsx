import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Input } from "../../components/Input";
import { Validate } from "../../utils/Validate";
import { message } from "antd";
import { styled } from "styled-components";
import { useAuthen } from "../AuthenContext";
import ReactDOM from "react-dom";
import { LOCAL_STORAGE } from "../../constant/localstorage";
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({});
  const { errors, setErrors } = useAuthen();
  const rules = {
    email: [
      {
        required: true,
        message: "Email không được bỏ trống.",
      },
      {
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Email không đúng định dạng",
      },
    ],
    password: [
      {
        required: true,
        message: "Mật khẩu không được bỏ trống.",
      },
    ],
  };
  const register = (attInput) => {
    return {
      value: form[attInput] || "",
      onChange: (e) => {
        setForm({ ...form, [attInput]: e.target.value });
      },
      error: errors[attInput],
    };
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    const errorObject = Validate(rules, form);
    setErrors(errorObject);
    if (Object.keys(errorObject)?.length === 0) {
      //   onLogin?.(form);
      handleLogin?.({
        email: form?.email || "",
        password: form?.password || "",
      });
    }
  };
  const { handleLogin, setRenderForm, renderForm, isAuthenModalOpen } =
    useAuthen();
  const isRenderFormLogin = renderForm === "login";
  const onCLickRenderForm = () => {
    setRenderForm("register");
  };
  const focusLoginRef = useRef();
  useEffect(() => {
    if (isRenderFormLogin || isAuthenModalOpen === true) {
      focusLoginRef?.current?.focus();
    }
  }, [isRenderFormLogin]);

  // console.log("focusLoginRef", focusLoginRef);

  return (
    <div
      className={`modal__wrapper-content mdlogin ${
        isRenderFormLogin ? "active" : ""
      } `}
    >
      <h3 className="title --t3">Đăng nhập</h3>
      {/* <div className="social">
        <a className="btn btn--google" href="#">
          <i>
            <img src="/img/icon-google.svg" alt="Google CFD" />
          </i>
          <span>Đăng ký bằng Google</span>
        </a>
        <a className="btn btn--facebook" href="#">
          <i>
            <img src="/img/icon-facebook-v2.svg" alt="Google CFD" />
          </i>
          <span>Đăng ký bằng Google</span>
        </a>
      </div>
      <span className="line">Hoặc</span> */}
      <Form onSubmit={onSubmit} action="#" className="form">
        <Input
          ref={focusLoginRef}
          required
          label="Email"
          placeholder="Nhập email"
          type="text"
          {...register("email")}
        />
        <Input
          required
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          type="password"
          {...register("password")}
        />
        {/* <input
          type="email"
          className="form__input"
          name="name"
          placeholder="Địa chỉ email"
        />
        <input
          type="password"
          className="form__input"
          name="name"
          placeholder="Mật khẩu"
        /> */}
        <div className="form__bottom">
          <p>
            Bạn chưa có tài khoản?
            <span
              onClick={onCLickRenderForm}
              className="color--primary btnmodal"
              data-modal="mdregister"
            >
              Đăng ký
            </span>
          </p>
          {/* <a className="color--primary" href="#">
            Quên mật khẩu?
          </a> */}
        </div>
        <button className="btn btn--primary form__btn-register" type="submit">
          Đăng nhập
        </button>
      </Form>
    </div>
  );
};
export default LoginForm;
