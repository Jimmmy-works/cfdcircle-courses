import React, { useState } from "react";
import { useAuthen } from "../AuthenContext";

export default function Overplay() {
  const { toggleNav, setToggleNav, handleNavbar } = useAuthen();
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={handleNavbar}
      className="overlay"
    ></div>
  );
}
