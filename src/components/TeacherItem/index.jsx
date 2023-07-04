import React from "react";

// // or only core styles
import "@splidejs/react-splide/css/core";
import { SplideSlide } from "@splidejs/react-splide";
const TeacherItem = ({ team }) => {
  return (
    <div className="teacher__list-item">
      <div className="img">
        <img src={team?.image} alt="Giảng viên CFD" />
      </div>
      <div className="info">
        <p className="label">{team?.jobTitle}</p>
        <h3 className="title --t3">{team?.name}</h3>
      </div>
    </div>
  );
};

export default TeacherItem;
