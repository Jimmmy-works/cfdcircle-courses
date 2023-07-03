import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant/pathnames";
import { fomatCurrency } from "../../utils/fomatCurrency";
import { Roles } from "../../constant/roles";
const CourseItem = React.memo((order) => {
  const { slug, image, tags, name, title, teams, price } = order || [];

  // type = isComming | isNormal;
  console.log("image", order?.course?.image);
  console.log("order", order);
  const teacherInfo = useMemo(
    () =>
      order?.course?.teams?.find((teacher) =>
        teacher?.tags?.includes(Roles.Teacher)
      ),
    [teams]
  );
  return (
    <div className="courses__list-item">
      <div className="img">
        <Link to={PATHS.COURSE + `/${slug}`}>
          <img
            src={order?.course?.image}
            alt="Khóa học CFD"
            className="course__thumbnail"
          />
          <span className="course__img-badge badge">
            {order?.course?.tags?.join(" | ")}
          </span>
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
            <strong>{fomatCurrency(order?.course?.price)}đ</strong>
          </div>
        </div>
        <div className="content__action">
          <Link to={`/register/${slug}`} className="btn btn--primary">
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
