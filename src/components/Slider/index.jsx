import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { PATHS } from "../../constant/pathnames";
import { useEffect } from "react";
import { useQuery } from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { useState } from "react";
import { dateVN } from "../../utils/timeDate";
import { Roles } from "../../constant/roles";

const Slider = () => {
  const { slug } = useParams();
  const { data, error, loading, refetch } = useQuery((query) =>
    courseService.getCoures(query)
  );
  const [course, setCourse] = useState([]);

  function courseComingList() {
    let courseComingSlider = $("#coursecoming__slider");
    courseComingSlider.flickity({
      cellAlign: "left",
      contain: true,
      prevNextButtons: false,
      pageDots: false,
      dragThreshold: 0,
      wrapAround: true,
    });

    $(".coursecoming .control .control__next").on("click", function (e) {
      e.preventDefault();
      courseComingSlider.flickity("next");
    });
    $(".coursecoming .control .control__prev").on("click", function (e) {
      e.preventDefault();
      courseComingSlider.flickity("previous");
    });
  }
  useEffect(() => {
    if (!data) return;
    setCourse(data?.courses);
  }, [data]);

  useEffect(() => {
    if (course.length) {
      courseComingList();
    }
  }, [course]);
  if (!course.length) return <>loading</>;
  return (
    <section className="coursecoming --scpadding">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Khoá học <span className="color--primary">sắp khai giảng</span>
          </h2>
          <div className="control">
            <div className="control__prev">
              <img src="img/icon-btn-control.svg" alt="icon prev" />
            </div>
            <div className="control__next">
              <img src="img/icon-btn-control.svg" alt="icon next" />
            </div>
          </div>
        </div>
      </div>
      <div className="coursecoming__list" id="coursecoming__slider">
        {course.length &&
          course.map((item, i) => {
            const teacherInfo = item?.teams?.find((teacher) => {
              return teacher?.tags?.includes(Roles.Teacher);
            });
            return (
              <div className="coursecoming__item" key={i}>
                <div className="coursecoming__item-img">
                  <Link to={PATHS.COURSE + `/${item.slug}`}>
                    <img src={item.image} alt="Khóa học sắp ra mắt CFD" />
                  </Link>
                </div>
                <div className="coursecoming__item-content">
                  <p className="category label">{item.name}</p>
                  <h2 className="title --t2">
                    <Link to={PATHS.COURSE + `/${item.slug}`}>{item.name}</Link>
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
                      <p className="title --t2">{dateVN(item.createdAt)}</p>
                    </div>
                    <div className="labeltext">
                      <span className="label --blue">Hình thức học</span>
                      <p className="title --t2">{item.tags.join(" | ")}</p>
                    </div>
                  </div>
                  <div className="btnwrap">
                    <Link
                      to={PATHS.COURSE_ORDER + `${item.slug}`}
                      className="btn btn--primary"
                    >
                      Đăng Ký Học
                    </Link>
                    <Link
                      to={PATHS.COURSE + `/${item.slug}`}
                      className="btn btn--border --black"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Slider;
