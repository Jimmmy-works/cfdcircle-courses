import React from "react";
import Accordion from "../../components/Accordion";

const CourseDetailFAQs = (props) => {
  const { questions } = props || {};
  return (
    <section className="faq --scpadding">
      <div className="container">
        <div className="faq__inner">
          <div className="heading --noline --center">
            <h2 className="heading__title title --t2">
              Câu hỏi <span className="color--primary">thường gặp</span>
            </h2>
          </div>
          <div className="faq__list">
            <Accordion
              title="Thông tin chung"
              data={questions.slice(0, 6)}
              renderTitle={(itemQuestion) => itemQuestion?.question}
              renderContent={(itemQuestion) => itemQuestion?.answer}
            />
            <Accordion
              title="Đăng kí, thanh toán, ưu đãi"
              data={questions.slice(6)}
              renderTitle={(itemQuestion) => itemQuestion?.question}
              renderContent={(itemQuestion) => itemQuestion?.answer}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailFAQs;
