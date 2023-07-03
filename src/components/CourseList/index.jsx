import React from "react";
import { PATHS } from "../../constant/pathnames";
import { fomatCurrency } from "../../utils/fomatCurrency";
import { Link } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";

const CourseList = ({ courses, teacherInfo, renderTitle, title }) => {
  return (
    <section className="courses">
      <div className="container">
        {renderTitle && renderTitle(title)}
        {/* renderTitle jsx */}

        <div className="courses__list">
          {!!courses?.length &&
            courses?.map((courseEle, index) => (
              <div key={index} className="courses__list-item">
                <div className="img">
                  <Link to={PATHS.COURSE + `/${courseEle?.slug}`}>
                    <img
                      src={courseEle?.image}
                      alt="Khóa học CFD"
                      className="course__thumbnail"
                    />
                    <span className="course__img-badge badge">
                      {courseEle?.tags?.join(" | ")}
                    </span>
                  </Link>
                </div>
                <div className="content">
                  <p className="label">Frontend</p>
                  <h3 className="title --t3">
                    <Link to={PATHS.COURSE + `/${courseEle?.slug}`}>
                      {courseEle?.name}
                    </Link>
                  </h3>
                  <div className="content__info">
                    <div className="user">
                      <div className="user__img">
                        <img src={teacherInfo?.image} alt="Avatar teacher" />
                      </div>
                      <p className="user__name">{teacherInfo?.name}</p>
                    </div>
                    <div className="price">
                      <strong className="price__discount">
                        {fomatCurrency(courseEle?.price)}đ
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CourseList;
