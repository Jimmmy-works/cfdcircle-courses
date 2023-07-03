import React, { useState } from "react";
import { Input } from "../../components/Input";
import Select from "../../components/Select";
import { Validate } from "../../utils/Validate";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useMutation } from "../../hooks/useMutation";
import { subscribeService } from "../../services/subscribeService";
import { useAuthen } from "../../components/AuthenContext";
export default function Contact() {
  const [form, setForm] = useState({});
  // Check Error
  let [errors, setErrors] = useState({});
  //Navigate
  const navigate = useNavigate();
  const optionsPageContact = [
    {
      value: "--",
      title: "--",
    },
    {
      value: "res",
      title: "Web Responsive",
    },
    {
      value: "react",
      title: "React JS",
    },
    {
      value: "vue",
      title: "Vue JS",
    },
    {
      value: "exp",
      title: "Express JS",
    },
  ];
  const rules = {
    name: [
      {
        required: true,
        message: "Họ và tên không được bỏ trống",
      },
      {
        regex: /^[a-z0-9_-]{8,30}$/,
        message:
          "Họ và tên phải từ 8-30 kí tự và không được sử dụng kí tự đặc biêt '@, #, !,...'",
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
    topic: [
      {
        required: true,
        message: "Vui lòng chọn 1 trong các khóa học",
      },
    ],
    textarea: [
      {
        required: true,
        message: "Vui lòng nhập nội dung",
      },
    ],
  };

  const {
    execute,
    data,
    error: errorSubscribes,
    loading,
  } = useMutation(subscribeService.subscribes);

  const { setIsToastContact } = useAuthen();
  // Validate
  const onSubmit = () => {
    const errorObject = Validate(rules, form);
    setErrors(errorObject);
    if (Object.keys(errorObject)?.length === 0) {
      const payload = {
        name: form?.name || "",
        email: form?.email || "",
        phone: form?.phone || "",
        topic: form?.topic || "",
        textarea: form?.textarea || "",
        // required backend
        title: "",
        description: "",
      };
      execute(payload);
      setForm({});
      // navigate("/");
      setIsToastContact(true);
      message.success("Gửi đăng kí thành công");
    } else {
      setIsToastContact(false);
      message.error("Gửi đăng kí thất bại");
    }
    // if (!!!form.name?.trim()) {
    //   errorObj.name = "Họ và tên không được để trống";
    // } else if (!/^[a-z0-9_-]{8,30}$/.test(form.name)) {
    //   errorObj.name =
    //     "Họ và tên phải từ 8-30 kí tự và không được sử dụng kí tự đặc biêt '@, #, !,...'";
    // }
    // if (!!!form.email?.trim()) {
    //   errorObj.email = "Email không được để trống";
    // } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
    //   errorObj.email = "Email không đúng định dạng";
    // }
    // if (!!!form.phone?.trim()) {
    //   errorObj.phone = "Số điện thoại không được để trống";
    // } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(form.phone)) {
    //   errorObj.phone = "Số điện thoại không đúng định dạng";
    // }
    // if (!!!form.topic?.trim()) {
    //   errorObj.topic = "Hãy lựa chọn khóa học bạn muốn";
    // }
    // if (!!!form.textarea?.trim()) {
    //   errorObj.textarea = "Hãy nhập nội dung ";
    // }
  };

  // Custom Input
  const register = (attInput) => {
    return {
      value: form[attInput] || "",
      onChange: (e) => {
        setForm({ ...form, [attInput]: e.target.value });
      },
      error: errors[attInput],
    };
  };
  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <div className="textbox">
          <h2 className="title --t2">Liên hệ &amp; Hỗ trợ</h2>
          <p className="desc">
            Bạn có bất cứ thắc mắc nào thì đừng ngần ngại liên hệ để được hỗ
            trợ?
            <br />
            Chúng tôi luôn ở đây
          </p>
        </div>
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <div className="sidebar">
              <div className="sidebar__address infor">
                <div className="infor__item">
                  <label className="label">CFD Circle</label>
                  <p className="title --t4">
                    666/46/29 Ba Tháng Hai, phường 14, quận 10, TPHCM
                  </p>
                </div>
                <div className="infor__item">
                  <label className="label">Email</label>
                  <p className="title --t4">info@cfdcircle.vn</p>
                </div>
                <div className="infor__item">
                  <label className="label">Số điện thoại</label>
                  <p className="title --t4">098 9596 913</p>
                </div>
              </div>
              <div className="sidebar__business">
                <p>
                  Đối với yêu cầu kinh doanh xin vui lòng gửi cho chúng tôi tại:
                </p>
                <a href="#">business@cfdcircle.vn</a>
              </div>
              <a href="#" className="sidebar__messenger btn btn--primary">
                Trò chuyện trực tuyến
              </a>
            </div>
            <div className="form">
              <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
              <div className="form-group">
                <Input
                  required
                  label="Họ và tên"
                  placeholder="Nhập họ và tên"
                  type="text"
                  {...register("name")}
                />
              </div>
              <div className="form-group">
                <Input
                  required
                  label="Số điện thoại"
                  placeholder="Nhập Số điện thoại"
                  type="text"
                  {...register("phone")}
                />
                {/* <input
                  value={form.email || ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  type="text"
                  className={`form__input ${!!errors.email ? `formerror` : ""}`}
                />{" "}
                <p className="error">{errors.email || ""}</p> */}
              </div>
              <div className="form-group">
                <Input
                  required
                  label="Email"
                  placeholder="Nhập Email"
                  type="text"
                  {...register("email")}
                />
              </div>
              <div className="form-group">
                {/* <div className="select">
                  <div className="head form__input">--</div>
                  <div className="sub">
                    <a href="#">Web Responsive</a>
                    <a href="#">React &amp; Redux</a>
                  </div>
                </div> */}
                <Select
                  required
                  label="Chủ đề cần hỗ trợ"
                  optionsPageContact={optionsPageContact}
                  {...register("topic")}
                />
              </div>
              <div className="form-group">
                <Input
                  label="Nội dung"
                  required
                  {...register("textarea")}
                  renderProps={(inputProps) => (
                    <textarea
                      {...register("textarea")}
                      className={`form__input ${
                        !!inputProps.error ? `formerror` : ""
                      }`}
                      {...inputProps}
                    />
                  )}
                />
              </div>
              <div className="btncontrol">
                <button onClick={onSubmit} className="btn btn--primary">
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
