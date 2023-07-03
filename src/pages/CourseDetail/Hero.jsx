import React from "react";
import { PATHS } from "../../constant/pathnames";
import { fomatCurrency } from "../../utils/fomatCurrency";
import { Link } from "react-router-dom";
const Hero = ({ courseDetail, teacherInfo, slug }) => {
  return (
    <section className="hero herodetail">
      <div className="hero__content">
        <div className="container">
          <h3 className="category label --white">frontend</h3>
          <h2 className="title --white">{courseDetail?.name}</h2>
          <div className="infor">
            <div className="infor__item">
              <label className="label --white">Khai giảng</label>
              <p className="title --t3 --white">
                {new Date(courseDetail?.startDate).toLocaleDateString()}
              </p>
            </div>
            <div className="infor__item">
              <label className="label --white">Thời lượng</label>
              <p className="title --t3 --white">{courseDetail?.duration}</p>
            </div>
            <div className="infor__item">
              <label className="label --white">Hình thức</label>
              <p className="title --t3 --white">
                {courseDetail?.tags?.join(" | ")}
              </p>
            </div>
          </div>
          {/* Chưa đăng ký */}
          <Link
            to={PATHS.RESGISTER + `/${slug}`}
            className="btn btn--primary btn-regcourse"
          >
            Đăng ký
          </Link>
          {/* Đã đăng ký */}
          {/* <div class="btn btn--primary btn-regcourse --disable">Đã đăng ký</div> */}
        </div>
      </div>
      <div className="hero__bottom">
        <div className="container-fluid">
          <a href="" className="user">
            <div className="user__img">
              <img
                src="https://cfdcircle.vn/files/avatars/480x480/VAOXpQdhq3yNvBMQlDItAYKU29ZO0gsxPTxdryL5.jpg"
                alt="Avatar teacher"
              />
            </div>
            <p className="user__name --white">{courseDetail?.name}</p>
          </a>
          <div className="pricebox">
            <p className="title --t3 --white">{courseDetail?.name}</p>
          </div>
          <Link
            to={
              "https://www.facebook.com/sharer/sharer.php?sdk=joey&u=https://cfdcircle.vn/khoa-hoc/khoa-hoc-lap-trinh-frontend-master-30&display=popup&ref=plugin&src=share_button"
            }
            // onclick="return !window.open(this.href, 'Facebook', 'width=640,height=580')"
            className="sharebox s--white"
          >
            Chia sẻ
            <i>
              <img
                src="https://cfdcircle.vn/img/iconshare.svg"
                alt="CFD Circle"
              />
            </i>
          </Link>
        </div>
      </div>
      <div className="hero__background">
        <img
          className="hero__background-img"
          src={courseDetail?.image}
          alt="CFD Circle"
        />
      </div>
    </section>
  );
};

export default Hero;
