import React from "react";
import Button from "../../components/Button";

const Hero = (props) => {
  const { token, openAuthenModal } = props || {};
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="container">
          <h1 className="title --white">
            Học Viện Đào Tạo
            <br /> Lập Trình Front-End Thực Chiến
          </h1>
          <p className="text">
            Dạy từ kinh nghiệm, học từ thực tế để tạo ra sản phẩm có giá trị.
          </p>
          {!token && <Button onClick={openAuthenModal}>Bắt đầu học</Button>}
        </div>
      </div>
      <div className="hero__bottom">
        <div className="container-fluid">
          <div className="hero__bottom-social">
            <a href="https://www.facebook.com/cfdcircle" target="_blank">
              <img src="img/icon-facebook.svg" alt="Facebook CFD" />
            </a>
            <a href="https://www.youtube.com/cfdcircle" target="_blank">
              <img src="img/icon-youtube.svg" alt="Youtube CFD" />
            </a>
          </div>
        </div>
      </div>
      <div className="hero__background">
        <video preload="none" autoPlay loop muted playsInline>
          <source src="/video/CFD-video-bg2.mp4" type="video/mp4" />
          Your Browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default Hero;
