import React, { useEffect } from "react";

const Galleries = (images) => {
  console.log("images", images?.images);
  useEffect(() => {
    function teamSlider() {
      let $carouselGallery = $(".gallery .list"),
        $progressBar = $(".gallery .timeline .process");
      $carouselGallery.flickity({
        contain: true,
        wrapAround: false,
        freeScroll: true,
        cellAlign: "left",
        lazyLoad: 6,
        imagesLoaded: true,
        wrapAround: true,
        pageDots: false,
        prevNextButtons: false,
      });
      $carouselGallery.on("scroll.flickity", function (event, progress) {
        progress = Math.max(0.05, Math.min(1, progress));
        $progressBar.width(progress * 100 + "%");
      });
      let ctrPrevGallery = $(".gallery .btn_ctr.prev"),
        ctrNextGallery = $(".gallery .btn_ctr.next");
      ctrPrevGallery.on("click", function () {
        $carouselGallery.flickity("previous");
      });
      ctrNextGallery.on("click", function () {
        $carouselGallery.flickity("next");
      });
    }
    if (images?.images?.length) {
      teamSlider();
    }
  }, [images]);

  return (
    <section className="gallery">
      <div className="heading --noline --center">
        <h2 className="heading__title title --t2">
          <span className="color--primary">CFD Circle</span> Là Một Team
        </h2>
      </div>
      <div className="list">
        {/* {galleriesData?.galleries?.length &&
          galleriesData?.galleries?.map((gallery) => gallery)} */}
        {!!images?.images?.length &&
          images?.images?.map((image, index) => (
            <img key={index} data-flickity-lazyload={image} alt="" />
          ))}
      </div>
      {/* <div className="list">
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc00541.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc00545.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc00662-1.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/beauty-1618471253214-2.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc6912.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc01147.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc00677.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc00678-1.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc6977.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc00688.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc01114.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/img-001-(1).jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc5918-2.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc5506.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc5511.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc5587-2.jpg"
          alt=""
        />
        <img
          data-flickity-lazyload="https://cfdcircle.vn/files/about/Team/dsc5637-1.jpg"
          alt=""
        />
      </div> */}
      <div className="controls">
        <div className="btn_ctr prev" />
        <span>Trượt qua</span>
        <div className="timeline">
          <div className="process" />
        </div>
        <div className="btn_ctr next" />
      </div>
    </section>
  );
};

export default Galleries;
