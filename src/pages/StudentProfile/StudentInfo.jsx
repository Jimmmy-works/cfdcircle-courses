import React, { useEffect, useState } from "react";
import { useAuthen } from "../../components/AuthenContext";
import { Input } from "../../components/Input";
import { message } from "antd";
import { authService } from "../../services/authService";
import { Validate } from "../../utils/Validate";
import { LOCAL_STORAGE } from "../../constant/localstorage";
import axios from "axios";
import Button from "../../components/Button";
export default function StudentInfo() {
  // control
  const [isSuccess, setIsSuccess] = useState(false);
  const { profileInfo, setProfileInfo } = useAuthen();
  const token = localStorage.getItem(LOCAL_STORAGE.token);
  const [form, setForm] = useState({
    password: `**********`,
  });
  const [errors, setErrors] = useState({});
  const rules = {
    firstName: [
      {
        required: true,
        message: "Họ và tên không được bỏ trống",
      },
    ],
    phone: [
      {
        required: true,
        message: "Số điện thoại không được bỏ trống.",
      },
      {
        regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        message: "Số điện thoại không đúng định dạng",
      },
    ],
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
        message: "Vui lòng điền mật khẩu",
      },
    ],
    introduce: [
      {
        required: true,
        message: "Vui lòng nhập nội dung",
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
  const onSubmit = async (e) => {
    e?.preventDefault();
    try {
      const errorObject = Validate(rules, form);
      setErrors(errorObject);
      // console.log("form", form);
      if (Object.keys(errorObject)?.length !== 0)
        return message.error("Vui lòng nhập đầy đủ thông tin");
      const resUploadProfile = await authService.uploadProfile(form, token);
      if (resUploadProfile.status) {
        setProfileInfo(resUploadProfile?.data?.data);
        message.success("Cập nhật thông tin thành công");
      }
      setIsSuccess(true);
    } catch (error) {
      message.error("Cập nhật thông tin thất bại");
      setIsSuccess(false);
    }
  };
  useEffect(() => {
    if (profileInfo) {
      setForm({ ...form, ...profileInfo });
    }
  }, [profileInfo]);
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form action="#" className="form">
        <div className="form-container">
          <div className="form-group">
            <Input
              required
              label="Họ và tên"
              placeholder="Nhập họ và tên"
              type="text"
              {...register("firstName")}
            />
            {/* <div className="error">Vui lòng nhập họ và tên</div> */}
          </div>
          <div className="form-group">
            <Input
              required
              label="Số điện thoại"
              placeholder="Nhập Số điện thoại"
              type="text"
              {...register("phone")}
            />
          </div>
        </div>
        <div className="form-container">
          <div className="form-group">
            <Input
              required
              label="Email"
              placeholder="Nhập Email"
              type="text"
              disabled
              {...register("email")}
            />
          </div>
          <div className="form-group">
            {/* <div className="form-grouppass"> */}
            {/* <label className="label">
                Mật khẩu <span>*</span>
              </label>
              <div className="textchange btnmodal" data-modal="mdchangepass">
                Đổi mật khẩu
              </div> */}
            <Input
              required
              label=" Mật khẩu"
              placeholder="Nhập Mật khẩu"
              type="password"
              disabled
              {...register("password")}
            />
            {/* </div> */}
          </div>
        </div>
        <div className="form-group">
          <Input
            label="Facebook URL"
            type="text"
            placeholder="Nhập Facebook URL"
            {...register("facebookURL")}
          />
        </div>
        <div className="form-group">
          <Input
            label="Website"
            type="text"
            placeholder="Nhập Website"
            {...register("website")}
          />
        </div>
        <div className="form-group">
          <Input
            label="Nội dung"
            required
            {...register("introduce")}
            renderProps={(inputProps) => (
              <textarea
                {...register("introduce")}
                className={`form__input ${
                  !!inputProps.error ? `formerror` : ""
                }`}
                {...inputProps}
              />
            )}
          />
        </div>
        {/* <div className="form-container textarea">
          <Input
            required
            label="Giới thiệu bản thân"
            type="text"
            {...register("introduce")}
            renderProps={() => {
              <textarea
                {...register("textarea")}
                className={`form__input ${
                  !!inputProps.error ? `formerror` : ""
                }`}
                {...inputProps}
              />;
            }}
          />
        </div> */}
        {isSuccess && <p className="noti">Cập nhận thông tin thành công</p>}
        <div className="form-group">
          <Button
            onClick={onSubmit}
            className="btnsubmit"
            style={{ width: "100%" }}
          >
            <span> Lưu lại</span>
          </Button>
          {/* <div className="btnsubmit">
            <button onClick={onSubmit} className="btn btn--primary">
              Lưu lại
            </button>
          </div> */}
        </div>
      </form>
    </div>
  );
}
