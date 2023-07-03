import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { PATHS } from "../../constant/pathnames";
import { courseService } from "../../services/courseService";
import { Roles } from "../../constant/roles";
import { fomatCurrency } from "../../utils/fomatCurrency";
import { useQuery } from "../../hooks/useQuery";
import Head from "./Head";
import Hero from "./Hero";
import Content from "./Content";
import Featured from "./Featured";
import Faq from "./Faq";
import CourseList from "../../components/CourseList";
import Loading from "../../components/Loading";
import useDebounce from "../../hooks/useDebounce";

export default function CourseDetail() {
  const { slug } = useParams();
  const {
    data: courses,
    error,
    loading: coursesLoading,
  } = useQuery(() => courseService.getCoures());
  const {
    data: questions,
    error: errorQuestions,
    loading: loadingQuestions,
  } = useQuery(() => courseService.getQuestions());
  //find course with slug
  const courseDetail = courses?.courses.find((courseItem) => {
    return courseItem.slug.includes(`${slug}`);
  });
  //fillter course
  const coursePropose = courses?.courses?.filter((courseElement) => {
    return !courseElement?.slug?.includes(`${slug}`);
  });
  // find teacher
  const teacherInfo = courseDetail?.teams?.find((teacher) =>
    teacher?.tags?.includes(Roles.Teacher)
  );
  const allLoading = coursesLoading || loadingQuestions;
  const isLoading = useDebounce(allLoading, 200);
  if (isLoading) return <Loading />;
  return (
    <>
      <Head slug={slug} teacherInfo={teacherInfo} courseDetail={courseDetail} />
      <main className="mainwrapper coursedetailpage">
        <Hero
          slug={slug}
          teacherInfo={teacherInfo}
          courseDetail={courseDetail}
        />
        <Content
          slug={slug}
          teacherInfo={teacherInfo}
          courseDetail={courseDetail}
        />
        <Featured />
        <Faq questions={questions} />
        <CourseList
          title={`Đề xuất khóa học`}
          renderTitle={(title) => (
            <div className="heading --center --noline">
              <h2 className="heading__title title --t2">{title}</h2>
            </div>
          )}
          courses={coursePropose}
          teacherInfo={teacherInfo}
        />
      </main>
    </>
  );
}
