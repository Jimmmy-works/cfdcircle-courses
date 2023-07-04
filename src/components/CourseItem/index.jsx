import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PATHS } from "../../constant/pathnames";
import { fomatCurrency } from "../../utils/fomatCurrency";
import { Roles } from "../../constant/roles";
import { dateVN } from "../../utils/timeDate";
import { SplideSlide } from "@splidejs/react-splide";
const CourseItem = React.memo((props) => {
  const {
    slug,
    image,
    tags,
    name,
    title,
    teams,
    price,
    createdAt,
    type = "nomal",
  } = props || [];
  const teacherInfo = useMemo(
    () => teams?.find((teacher) => teacher?.tags?.includes(Roles.Teacher)),
    [teams]
  );
  if (type === "coming") {
    return (
      <SplideSlide className="coursecoming__item">
        <div className="coursecoming__item-img">
          <Link to={PATHS.COURSE + `/${slug}`}>
            <img src={image} alt="Khóa học sắp ra mắt CFD" />
          </Link>
        </div>
        <div className="coursecoming__item-content">
          <p className="category label">{name}</p>
          <h2 className="title --t2">
            <Link to={PATHS.COURSE + `/${slug}`}>{name}</Link>
          </h2>
          <div className="user">
            <div className="user__img">
              <img src={teacherInfo.image} alt="Avatar teacher" />
            </div>
            <p className="user__name">{teacherInfo.name}</p>
          </div>
          <div className="info">
            <div className="labeltext">
              <span className="label --blue">Ngày khai giảng</span>
              <p className="title --t2">{dateVN(createdAt)}</p>
            </div>
            <div className="labeltext">
              <span className="label --blue">Hình thức học</span>
              <p className="title --t2">{tags.join(" | ")}</p>
            </div>
          </div>
          <div className="btnwrap">
            <Link
              to={PATHS.RESGISTER + `/${slug}`}
              className="btn btn--primary"
            >
              Đăng Ký Học
            </Link>
            <Link
              to={PATHS.COURSE + `/${slug}`}
              className="btn btn--border --black"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </SplideSlide>
    );
  }
  return (
    <div className="courses__list-item">
      <div className="img">
        <Link to={PATHS.COURSE + `/${slug}`}>
          <img src={image} alt="Khóa học CFD" className="course__thumbnail" />
          <span className="course__img-badge badge">{tags?.join(" | ")}</span>
        </Link>
      </div>
      <div className="content">
        <p className="label">{title}</p>
        <h3 className="title --t3">
          <Link to={PATHS.COURSE + `/${slug}`}>{name}</Link>
        </h3>
        <div className="content__info">
          <div className="user">
            {teacherInfo && (
              <>
                <div className="user__img">
                  <img src={teacherInfo?.image} alt="Avatar teacher" />
                </div>
                <p className="user__name">{teacherInfo?.name}</p>
              </>
            )}
          </div>
          <div className="price">
            <strong>{fomatCurrency(price)}đ</strong>
          </div>
        </div>
        <div className="content__action">
          <Link to={PATHS.RESGISTER + `/${slug}`} className="btn btn--primary">
            Đăng ký ngay
          </Link>
          <Link to={PATHS.COURSE + `/${slug}`} className="btn btn--default">
            <img src="/img/icon-paper.svg" alt="icon paper" />
          </Link>
        </div>
      </div>
    </div>
  );
});
export default CourseItem;
