import { Link, useParams } from "react-router-dom";
import { PATHS } from "../../constant/pathnames";
import { useAuthen } from "../../components/AuthenContext";
import Slider from "../../components/Slider";
import Button from "../../components/Button";
import { LOCAL_STORAGE } from "../../constant/localstorage";
import CourseList from "../../components/CourseList";
import { useQuery } from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { Roles } from "../../constant/roles";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import Loading from "../../components/Loading";
import Flickity from "react-flickity-component";
import Hero from "./Hero";
import Teachers from "./Teachers";
import Featured from "./Featured";
import Testimonial from "./Testimonial";
import FAQs from "./FAQs";
import Galleries from "./Galleries";

export default function Home() {
  const { openAuthenModal } = useAuthen();
  const token = localStorage.getItem(LOCAL_STORAGE.token);
  const { data: coursesData, loading: coursesLoading } = useQuery(() =>
    courseService.getCoures()
  );
  const { data: questionsData, loading: questionsLoading } = useQuery(() =>
    courseService.getQuestions()
  );
  const { data: teamsData, loading: teamsLoading } = useQuery(() =>
    courseService.getTeams()
  );
  const { data: galleriesData, loading: galleriesLoading } = useQuery(() =>
    courseService.getGalleries()
  );
  // Data coming soon
  const comingCourses = useMemo(
    () =>
      coursesData?.courses.filter(
        (coming) =>
          (coming?.startDate && new Date(coming?.startDate) < new Date()) || []
      ),

    [coursesData]
  );
  const allLoadingHome =
    coursesLoading || questionsLoading || teamsLoading || galleriesLoading;
  const isLoading = useDebounce(allLoadingHome, 300);
  if (isLoading) return <Loading />;

  return (
    <main className="mainwrapper">
      <Hero token={token} />
      <Slider sliderCourse={comingCourses} />
      <Teachers teamsData={teamsData}></Teachers>
      <Featured />
      {/* --------------------------------Testimonial-------------------------------- */}
      <Testimonial />
      {/* --------------------------------faq-------------------------------- */}
      <FAQs questionsData={questionsData} />
      <Galleries images={galleriesData?.galleries[0]?.images || []} />
      <section className="callregister">
        <div className="container">
          <div className="callregister__content">
            <h3 className="title --t2">
              <span className="color--primary">trở thành một phần</span> của CFD
              Circle
            </h3>
            <p>
              Chúng tôi rất vui khi bạn quyết định trở thành một phần của CFD
              Circle để cùng nhau học hỏi, lan toả và chia sẻ những kinh nghiệm
              quý giá cho cộng đồng.
            </p>
            <Button link={`${PATHS.COURSE}`}>Tham gia Khoá học</Button>
            <Button link={`${PATHS.CONTACT}`} variant="border">
              Liên hệ tư vấn
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
