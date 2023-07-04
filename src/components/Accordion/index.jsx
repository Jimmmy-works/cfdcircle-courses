import React, { useState } from "react";

const Accordion = (props) => {
  const { title, data, renderTitle, renderContent } = props || {};
  const [isActive, setIsActive] = useState(null);
  return (
    <div className="accordion">
      {title && <h3 className="accordion__title label">{title}</h3>}
      {!!data?.length &&
        data?.map((item, index) => {
          // console.log("item", item?.description);
          return (
            <div
              onClick={() => {
                setIsActive((prev) =>
                  prev === item?.id || prev === index ? null : item?.id || index
                );
              }}
              key={item?.id || index}
              className={`accordion__content ${
                isActive === item?.id || isActive === index ? "active" : ""
              }`}
            >
              <div className="accordion__content-title">
                <h4>
                  <strong>{renderTitle(item)}</strong>
                </h4>
              </div>
              <div className="accordion__content-text">
                {!item?.description
                  ? renderContent(item)
                  : renderContent(
                      item?.description?.map((element) => {
                        console.log("element", element);
                        return (
                          <div className="accordion__content">
                            <div className="accordion__content-title">
                              <h4>
                                <strong>{`${element}`}</strong>
                              </h4>
                            </div>
                            <div
                              className="accordion__content-text --transparent"
                              style={{ display: "none" }}
                            >
                              <div className="item --lock">
                                <p>
                                  <i>
                                    <img
                                      src="https://cfdcircle.vn/img/iconlock.svg"
                                      alt="CFD Circle"
                                    />
                                  </i>
                                  <span>{`${element}`}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
              </div>
            </div>
          );
        })}
      {/* <div className="accordion__content">
        <div className="accordion__content-title">
          <h4>
            <strong>Thành viên sáng lập CFD gồm những ai?</strong>
          </h4>
        </div>
        <div className="accordion__content-text">
          Đối với hình thức học Offline hoặc Online cùng lớp offline thông qua
          Google Meet thì học viên có thể hỏi trực tiếp trong lúc học, cũng như
          là hỏi trên nhóm chat Facebook của lớp bạn đang học, giảng viên và
          mentor sẽ hỗ trợ 24/7. <br />
          <br />
          Đối với hình thức học Video Mentor, học viên có thể đặt câu hỏi trong
          các buổi dạy online của giảng viên, cũng như là hỏi trên nhóm chat
          Telegram của lớp bạn đang học, giảng viên và mentor sẽ hỗ trợ 24/7.{" "}
          <br />
          <br />
          Đối với hình thức học Video, học viên có thể đặt câu hỏi thông qua
          nhóm chat Facebook hỗ trợ học viên của đội ngũ giảng viên và mentor
          CFD Circle.
        </div>
      </div>
      <div className="accordion__content">
        <div className="accordion__content-title">
          <h4>
            <strong>
              Học tại CFD Circle xong có đi làm hay thực tập được không?
            </strong>
          </h4>
        </div>
        <div className="accordion__content-text">
          Khóa học thực chiến tại CFD Circle giúp học viên trải nghiệm dự án,
          quy trình làm việc và kỹ năng thực tế cần có để không chỉ xin thực tập
          mà còn có thể ứng tuyển các vị trí chính thức cao hơn như ở các công
          ty.
        </div>
      </div>
      <div className="accordion__content">
        <div className="accordion__content-title">
          <h4>
            <strong>
              CFD Circle có cam kết đầu ra và cấp chứng chỉ không?
            </strong>
          </h4>
        </div>
        <div className="accordion__content-text">
          Hiện tại, CFD Circle không quảng cáo bằng cách cam kết đầu ra 100% để
          thu hút học viên, vì thế, CFD không cam kết đầu ra và chứng chỉ, điều
          chúng tôi làm là cố gắng hết sức để truyền đạt và giúp cho tất cả học
          viên có thể làm được việc và các kỹ năng thực tế cần có sau khóa học
          và ứng tuyển ít nhất là vị trí fresher cho các công ty.
        </div>
      </div>
      <div className="accordion__content">
        <div className="accordion__content-title">
          <h4>
            <strong>Học tại CFD Circle sao cho hiệu quả nhất?</strong>
          </h4>
        </div>
        <div className="accordion__content-text">
          Học viên cần chuẩn bị đủ thời gian để học Offline hoặc Online, cũng
          như thời gian để hoàn thành bài tập, tự học tại nhà.
          <br />
          <br /> Tự tin vào bản thân, kiên trì, cố gắng và sức chiến đấu cao
          không lùi bước, chủ động hỏi những vấn đề chưa rõ để được giải đáp và
          hỗ trợ. <br />
          <br /> Hạn chế tối đa việc nghỉ học, nếu có nghỉ thì phải xin và xem
          lại video được ghi lại trong lúc học để hoàn thành bài tập và kiến
          thức ngày hôm đó.
        </div>
      </div>
      <div className="accordion__content">
        <div className="accordion__content-title">
          <h4>
            <strong>Sau mỗi buổi học có quay video để xem lại không?</strong>
          </h4>
        </div>
        <div className="accordion__content-text">
          CFD Circle sẽ quay lại video buổi học offline để các bạn không tham
          gia được có thể xem lại bằng cách đăng nhập vào website CFD, chọn mục
          Khóa Học Của Tôi, chọn Khóa Đang Học và xem lại video.
          <br />
          <br />
          Bản quyền video thuộc về CFD Circle, nên nếu học viên tìm cách tải
          video về và chia sẻ thì sẽ bị khóa tài khoản vĩnh viễn.
        </div>
      </div> */}
    </div>
  );
};

export default Accordion;
