import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant/pathnames";

import StudentInfo from "./StudentInfo";
import StudentCourse from "./StudentCourse";
import StudentPayment from "./StudentPayment";

export default function StudentProfile() {
  return (
    <>
      <StudentInfo />
      <StudentPayment />
      <StudentCourse />
    </>
  );
}
