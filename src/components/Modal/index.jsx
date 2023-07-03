import React, { useRef } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant/pathnames";
import { useAuthen } from "../AuthenContext";
export default function Modal() {
  const modalRef = useRef();
  const { isToastContact, setIsToastContact } = useAuthen();

  return ReactDom.createPortal(
    <div
      ref={modalRef}
      className={`modal ${isToastContact === true ? "open" : ""}`}
    >
      <div className="modal__wrapper">
        <div className="modal__wrapper-content mdnotice active">
          <img src="/img/check.svg" alt="" />
          <h3 className="title --t3">Gửi thông tin thành công!</h3>
          <p>
            Chúng tôi sẽ phản hồi lại cho bạn trong thời gian sớm nhất có thể
          </p>
          <Link
            to={PATHS.CONTACT}
            onClick={() => setIsToastContact(!isToastContact)}
            className="btn btn--primary"
          >
            Đồng Ý
          </Link>
        </div>
      </div>
      <div className="modal__overlay"></div>
    </div>,
    document.body
  );
}
