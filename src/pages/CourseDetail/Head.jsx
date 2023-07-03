import React from "react";
import { PATHS } from "../../constant/pathnames";
import { fomatCurrency } from "../../utils/fomatCurrency";
import { Link } from "react-router-dom";

const Head = ({ courseDetail, teacherInfo, slug }) => {
  return (
    <div className="headtop">
      <div className="container-fluid">
        <div className="headtop__left">
          <div className="headtop__left-avatar">
            <img src={courseDetail?.image} alt="" />
          </div>
          <div className="headtop__left-title">
            <h2>
              <strong>{courseDetail?.name}</strong>
            </h2>
            <p>{teacherInfo?.name}</p>
          </div>
        </div>
        <div className="headtop__right">
          <div className="headtop__right-price">
            <strong>{fomatCurrency(courseDetail?.price)} VND</strong>
          </div>
          <Link
            to={PATHS.RESGISTER + `/${slug}`}
            className="btn btn--primary btn-regcourse"
          >
            đăng ký học
          </Link>
        </div>
      </div>
      <div className="headtop__progress" />
    </div>
  );
};

export default Head;
