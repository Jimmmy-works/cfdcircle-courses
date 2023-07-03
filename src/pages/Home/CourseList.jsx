import React from "react";
import { PATHS } from "../../constant/pathnames";
import { Link } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { fomatCurrency } from "../../utils/fomatCurrency";

const CourseList = () => {
  const { data } = useQuery(() => courseService.getCoures());
  const dataCourse = data?.courses;
  console.log("dataCourse", dataCourse);
  return (
    <section className="courses">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Tất cả <span className="color--primary">khóa học</span>
          </h2>
        </div>
        <div className="courses__list">
          {dataCourse?.map((courseItem) => (
            <div key={courseItem?.id} className="courses__list-item">
              <div className="img">
                <Link to={PATHS.COURSE + `/${courseItem.slug}`}>
                  <img
                    src={courseItem?.image}
                    alt="Khóa học CFD"
                    className="course__thumbnail"
                  />
                  <span className="course__img-badge badge">
                    {courseItem?.tags.join(" | ")}
                  </span>
                </Link>
              </div>
              <div className="content">
                <p className="label">Front-End</p>
                <h3 className="title --t3">
                  <Link to={PATHS.COURSE + `/${courseItem.slug}`}>
                    {courseItem?.name}
                  </Link>
                </h3>
                <div className="content__info">
                  <div className="user">
                    <div className="user__img">
                      <img src="img/avatar_nghia.jpg" alt="Avatar teacher" />
                    </div>
                    <p className="user__name">Trần Nghĩa</p>
                  </div>
                  <div className="price">
                    <strong> {fomatCurrency(courseItem?.price)}đ</strong>
                  </div>
                </div>
                <div className="content__action">
                  <Link to={PATHS.COURSE_ORDER} className="btn btn--primary">
                    Đăng ký ngay
                  </Link>
                  <Link
                    to={PATHS.COURSE + `/${courseItem.slug}`}
                    className="btn btn--default"
                  >
                    <img src="img/icon-paper.svg" alt="icon paper" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="courses__btnall">
          <a href="courses.html" className="course__btn btn btn--grey">
            Tất cả khoá học
          </a>
        </div>
      </div>
    </section>
  );
};

export default CourseList;
