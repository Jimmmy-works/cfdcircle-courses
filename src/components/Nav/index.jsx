import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthen } from "../AuthenContext";
// import { backToTop } from "../../utils/scrollToTop";
export default function Nav() {
  const { handleNavbar } = useAuthen();
  const onClickNav = () => {
    handleNavbar();
  };
  return (
    <>
      <nav className="navbar">
        <ul className="navbar__main">
          <li className="navbar__link">
            <NavLink onClick={onClickNav} to={"/"} className="navbar__item ">
              Trang chủ
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink
              onClick={onClickNav}
              to={"/about"}
              className="navbar__item"
            >
              Về CFD Circle
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink
              onClick={onClickNav}
              to={"/course"}
              className="navbar__item"
            >
              Khóa học
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink onClick={onClickNav} to={"/blog"} className="navbar__item">
              Bài viết
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink
              onClick={onClickNav}
              to={"/contact"}
              className="navbar__item"
            >
              Liên hệ
            </NavLink>
          </li>
        </ul>
        <div className="navbar__overlay"></div>
      </nav>
    </>
  );
}
