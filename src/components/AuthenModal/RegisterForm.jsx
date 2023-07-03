import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Validate } from "../../utils/Validate";
import { Input } from "../../components/Input";
import { useAuthen } from "../AuthenContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export default function RegisterForm({ onRegister }) {
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
    name: [
      {
        required: true,
        message: "Họ và tên không được bỏ trống",
      },
      // {
      //   regex: /^[a-z0-9_-]{8,30}$/,
      //   message:
      //     "Họ và tên phải từ 8-30 kí tự và không được sử dụng kí tự đặc biêt '@, #, !,...'",
      // },
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
  const { handleRegister, renderForm, setRenderForm } = useAuthen();
  const onSubmit = (ev) => {
    ev.preventDefault();
    const errorObject = Validate(rules, form);
    setErrors(errorObject);
    if (Object.keys(errorObject)?.length === 0) {
      // onRegister?.(form);
      handleRegister?.({
        firstName: form?.name,
        lastName: "",
        email: form?.email || "",
        password: form?.password || "",
      });
    }
  };
  const isRenderFormRegister = renderForm === "register";
  const firstInputFocus = useRef();

  useEffect(() => {
    if (isRenderFormRegister) {
      firstInputFocus?.current?.focus();
    } else {
      setErrors({});
      setForm({});
    }
  }, [isRenderFormRegister]);
  // console.log("firstInputFocus", firstInputFocus);
  return (
    <div
      className={`modal__wrapper-content mdregister ${
        isRenderFormRegister ? "active" : ""
      }`}
    >
      <h3 className="title --t3">Đăng ký tài khoản</h3>
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
          ref={firstInputFocus}
          id="firstInput"
          required
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          type="text"
          {...register("name")}
        />
        <Input
          required
          label="Email"
          placeholder="Nhập Email"
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
          type="text"
          className="form__input"
          name="name"
          placeholder="Họ và tên"
        />
        <input
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
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý
          <a className="color--primary" href="#">
            Chính Sách
          </a>{" "}
          &
          <a className="color--primary" href="#">
            Điều Khoản
          </a>{" "}
          của CFD
        </p>
        <a
          onClick={() => setRenderForm("login")}
          style={{ cursor: "pointer" }}
          className="color--primary"
        >
          Bạn đã có tài khoản?
        </a>
        <button className="btn btn--primary form__btn-register" type="submit">
          Đăng ký
        </button>
      </Form>
    </div>
  );
}
