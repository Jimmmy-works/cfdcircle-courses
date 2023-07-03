import React from "react";
import { useAuthen } from "../../components/AuthenContext";
import CoursePaymentItem from "../../components/CousePaymentItem";

export default function StudentPayment() {
  const { coursePayment } = useAuthen();
  const hasCoursePayment = !!coursePayment?.length;
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {hasCoursePayment &&
        coursePayment.map((payment) => (
          <CoursePaymentItem key={payment.id} {...payment} />
        ))}
      {!hasCoursePayment && <p>Bạn chưa có thanh toán nào</p>}
    </div>
  );
}
