import React from "react";
import { fomatCurrency } from "../../utils/fomatCurrency";
import "moment/locale/vi";
import moment from "moment";
import { dateVN } from "../../utils/timeDate";
export default function CoursePaymentItem({ ...props }) {
  const { paymentMethod, course, createdAt } = props || {};
  const langVN = moment(createdAt).format("DD/MM/YYYY HH:mm:ss");
  return (
    <>
      <div className="itemhistory">
        <div className="name">{course?.name}</div>
        <div className="payment">{paymentMethod}</div>
        <div className="date">{langVN}</div>
        <div className="money">{fomatCurrency(course?.price)}</div>
      </div>
    </>
  );
}
