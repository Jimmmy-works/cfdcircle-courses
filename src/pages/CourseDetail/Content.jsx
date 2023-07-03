import React from "react";

const Content = ({ courseDetail, teacherInfo, slug }) => {
  return (
    <section className="contentdetail">
      <div className="content">
        <div className="container">
          <div className="contentrow ctintro">
            <h3 className="contentrow__title title --t3">Giới thiệu</h3>
            <div className="contenteditor">
              <h2
                dangerouslySetInnerHTML={{
                  __html: courseDetail?.description,
                }}
              ></h2>
              <div className="videowrap">
                <iframe
                  title="YouTube video player"
                  src="https://www.youtube.com/embed/C7GoVPoamdM?rel=0"
                  width={560}
                  height={315}
                  frameBorder={0}
                  allowFullScreen="allowfullscreen"
                />
              </div>
            </div>
          </div>
          <div className="contentrow ctschedule">
            <h3 className="contentrow__title title --t3">Lịch học</h3>
            <div className="ctschedule__box">
              <div className="info">
                <div className="labeltext">
                  <span className="label --blue">Khai giảng</span>
                  <p className="title --t3">
                    {new Date(
                      courseDetail?.schedule?.startDate
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Ngày học</span>
                  <p className="title --t3">{courseDetail?.schedule?.days}</p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Thời gian</span>
                  <p className="title --t3">{courseDetail?.schedule?.time}</p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Địa điểm</span>
                  <p className="title --t3">
                    {courseDetail?.schedule?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="contentrow ctlession">
            <h3 className="contentrow__title title --t3">Nội dung khoá học</h3>
            <div className="accordion">
              {courseDetail?.content?.length > 0 &&
                courseDetail?.content?.map((contentElem, index) => {
                  return (
                    <div
                      key={contentElem.id || index}
                      className="accordion__content"
                    >
                      <div className="accordion__content-title">
                        <h4>
                          <strong>{contentElem?.title}</strong>
                        </h4>
                      </div>
                      <div
                        className="accordion__content-text --transparent"
                        style={{ display: "none" }}
                      >
                        {contentElem?.description?.length > 0 &&
                          contentElem?.description?.map((des, index) => (
                            <div key={index} className="item --lock">
                              <p>
                                <i>
                                  <img
                                    src="https://cfdcircle.vn/img/iconlock.svg"
                                    alt="CFD Circle"
                                  />
                                </i>
                                <span>{des}</span>
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="contentrow ctrequest">
            <h3 className="contentrow__title title --t3">Yêu cầu cần có</h3>
            <div className="ctrequest__content">
              {courseDetail?.required?.length > 0 &&
                courseDetail?.required?.map((require, index) => {
                  return <p key={index}>{require}</p>;
                })}
            </div>
          </div>
          <div className="contentrow ctteacher">
            <h3 className="contentrow__title title --t3">Giảng viên</h3>
            <div className="ctteacher__content">
              {courseDetail?.teams?.length > 0 &&
                courseDetail?.teams?.map((member, index) => (
                  <div key={index} className="itemteacher">
                    <div className="itemteacher__avatar">
                      <img src={member?.image} alt="CFD Circle" />
                    </div>
                    <div className="itemteacher__info">
                      <div className="itemteacher__info-name">
                        <p className="title --t3">{member?.name}</p>

                        <span className="label badge --teacher">
                          {member?.tags[0] === "Teacher" ? "Teacher" : "Mentor"}
                        </span>
                      </div>
                      <h5 className="itemteacher__info-pos label">
                        {member?.jobTitle}
                      </h5>
                      <p className="itemteacher__info-des">
                        {member?.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
