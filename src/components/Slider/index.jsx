import React, { useMemo } from "react";
import CourseItem from "../CourseItem";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";

// // or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// // or only core styles
import "@splidejs/react-splide/css/core";
import { styled } from "styled-components";
const Arrow = styled.div``;
const Slider = ({ sliderCourse }) => {
  // const [course, setCourse] = useState([]);

  // useEffect(() => {
  //   function courseComingList() {
  //     let courseComingSlider = $("#coursecoming__slider");
  //     courseComingSlider.flickity({
  //       cellAlign: "left",
  //       contain: true,
  //       prevNextButtons: false,
  //       pageDots: false,
  //       dragThreshold: 0,
  //       wrapAround: true,
  //     });

  //     $(".coursecoming .control .control__next").on("click", function (e) {
  //       e.preventDefault();
  //       courseComingSlider.flickity("next");
  //     });
  //     $(".coursecoming .control .control__prev").on("click", function (e) {
  //       e.preventDefault();
  //       courseComingSlider.flickity("previous");
  //     });
  //   }
  //   if (sliderCourse?.length > 0) {
  //     courseComingList();
  //   }
  // }, [sliderCourse]);

  // useEffect(() => {
  //   if (!data) return;
  //   setCourse(data?.courses);
  // }, [data]);

  // useEffect(() => {
  //   if (course.length) {
  //     courseComingList();
  //   }
  // }, [course]);
  // if (!course.length) return <>loading</>;

  // new Splide(".splide", {
  //   classes: {
  //     arrows: "splide__arrows control",
  //     arrow: "splide__arrow ",
  //     prev: "splide__arrow--prev control__prev ",
  //     next: "splide__arrow--next control__next",
  //   },
  // });

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
      <Splide
        style={{ padding: 0 }}
        hasTrack={false}
        aria-label="My Favorite Images"
      >
        <div className="coursecoming__list" id="coursecoming__slider">
          <SplideTrack>
            {sliderCourse?.map((slider, index) => {
              return <CourseItem type="coming" {...slider} key={slider?.id} />;
            })}
          </SplideTrack>
        </div>
      </Splide>
    </section>
  );
};

export default Slider;
