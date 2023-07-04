import React, { useEffect } from "react";
import TeacherItem from "../../components/TeacherItem";
// Default theme
import "@splidejs/react-splide/css";

// // or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// // or only core styles
import "@splidejs/react-splide/css/core";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
const Teachers = ({ teamsData }) => {
  useEffect(() => {
    function teacherSlider() {
      let courseComingSlider = $(
        ".teacher .teacher__list .teacher__list-inner"
      );
      courseComingSlider.flickity({
        cellAlign: "left",
        contain: true,
        prevNextButtons: false,
        pageDots: false,
        dragThreshold: 0,
      });

      $(".teacher .control .control__next").on("click", function (e) {
        e.preventDefault();
        courseComingSlider.flickity("next");
      });
      $(".teacher .control .control__prev").on("click", function (e) {
        e.preventDefault();
        courseComingSlider.flickity("previous");
      });
      courseComingSlider.flickity("resize");
    }
    teacherSlider();

    if (teamsData?.length > 0) {
      teacherSlider();
    }
  }, [teamsData]);

  return (
    <section className="teacher --scpadding">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Đội Ngũ <span className="color--primary">CFD Circle</span>
          </h2>
          <div className="heading__content">
            <p className="text">
              Đội ngủ giảng viên và mentor tâm huyết nhiều kinh nghiệm được tích
              luỹ từ những dự án thực tế sẽ đồng hành cùng bạn xuyên suốt quá
              trình học và con đường phát triển sự nghiệp.
            </p>
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
      </div>
      <div className="teacher__list">
        <div className="container">
          <div className="teacher__list-inner">
            {/* <Splide
              style={{ padding: 0 }}
              hasTrack={false}
              aria-label="My Favorite Images"
            > */}
            {/* <SplideTrack> */}
            {teamsData?.teams?.map((team) => (
              <TeacherItem team={team} key={team?.id} />
            ))}
            {/* </SplideTrack> */}
            {/* </Splide> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teachers;
