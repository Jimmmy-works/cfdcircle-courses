import React, { useCallback, useEffect, useMemo, useState } from "react";
import Select from "../../components/Select";
import { Input } from "../../components/Input";
import { Validate } from "../../utils/Validate";
import { useMutation } from "../../hooks/useMutation";
import { message } from "antd";
// import Radio from "../../components/Radio";
import { useQuery } from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { useNavigate, useParams } from "react-router-dom";
import { Roles } from "../../constant/roles";
import { orderService } from "../../services/orderService";
import { LOCAL_STORAGE } from "../../constant/localstorage";
import { fomatCurrency } from "../../utils/fomatCurrency";
import { useAuthen } from "../../components/AuthenContext";
import Button from "../../components/Button";
import Radio from "../../components/RadioContext";
import { PATHS } from "../../constant/pathnames";
import useDebounce from "../../hooks/useDebounce";
import Loading from "../../components/Loading";

export default function CourseOrder() {
  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("atm");
  const onPaymentChange = (method) => {
    setPaymentMethod(method);
  };
  // Form
  // Param slug
  const { slug } = useParams();
  // navigate
  const navigate = useNavigate();
  // token
  const token = localStorage.getItem(LOCAL_STORAGE.token);
  // Course Detail
  const {
    data: courseDetail,
    error: courseDetailError,
    loading: courseDetailLoading,
  } = useQuery(() => courseService.getCoures(slug));
  const {
    name,
    image,
    price,
    teams,
    tags,
    id: courseDetailId,
  } = courseDetail || {};
  //Course Detail find teacher
  const teacherInfo = useMemo(
    () => teams?.find((teacher) => teacher?.tags?.includes(Roles.Teacher)),
    [teams]
  );

  // Profile info
  const { profileInfo, onGetCourseHistory, onGetCoursePayment, courseOrder } =
    useAuthen();

  // find ordered
  const orderedCourse = courseOrder?.find(
    (info) => info?.course?.id === courseDetailId
  );
  const isAlreadyOrdered = !!orderedCourse?.id;
  const {
    name: orderedName,
    image: orderedImage,
    price: orderedPrice,
    teams: orderedTeams,
    id: orederedId,
  } = orderedCourse || {};
  const teacherInfoOrdered = useMemo(
    () =>
      orderedTeams?.find((teacher) => teacher?.tags?.includes(Roles.Teacher)),
    [orderedTeams]
  );
  // Type Option
  const typeOptions = useMemo(() => {
    return (
      tags?.map((tag) => {
        return {
          label: tag,
          value: tag?.toLowerCase(),
        };
      }) || []
    );
  }, [tags]);
  const [form, setForm] = useState({});
  let [errors, setErrors] = useState({});
  const { execute: excuteOrderCourse, loading: mutationLoading } = useMutation(
    orderService.orderCourse,
    {
      onSuccess: async () => {
        message.success("Đăng kí khóa học thành công");
        await onGetCourseHistory();
        await onGetCoursePayment();
        navigate(`${PATHS.PROFILE.COURSES}`);
      },
      onFail: (error) => {
        console.log("error", error);
        message.error("Đăng kí khóa học thất bại");
      },
    }
  );
  const rules = {
    name: [
      {
        required: true,
        message: "Họ và tên không được bỏ trống",
      },
    ],
    phone: [
      {
        required: true,
        message: "Số điện thoại không được bỏ trống.",
      },
      {
        regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        message: "Số điện thoại không đúng định dạng",
      },
    ],
    type: [
      {
        required: true,
        message: "Thông tin không được để trống",
      },
    ],
    paymentMethod: [
      {
        required: true,
        message: "Vui lòng chọn 1 trong các hình thức",
      },
    ],
  };

  // Validate form
  const register = (attInput) => {
    return {
      value: form[attInput] || "",
      error: form[attInput] || "",
      onChange: (e) => {
        setForm({ ...form, [attInput]: e.target.value });
      },
      error: errors[attInput],
    };
  };
  const onSubmit = useCallback(async () => {
    if (!isAlreadyOrdered) {
      const errorObject = Validate(rules, form);
      setErrors(errorObject);
      if (Object.keys(errorObject)?.length === 0) {
        //success
        if (courseDetailId) {
          const payload = {
            name: form?.name,
            phone: form?.phone,
            course: courseDetailId,
            type: form?.type,
            paymentMethod: paymentMethod,
          };
          excuteOrderCourse(payload, token);
          // try {
          //   // const res = await orderService.orderCourse(payload, token);
          //   // if (res?.data?.data) {
          //   //   message.success("Đăng kí khóa học thành công");
          //   //   await onGetCourseHistory();
          //   //   await onGetCoursePayment();
          //   //   navigate(`${PATHS.PROFILE.COURSES}`);
          //   // }
          // } catch (error) {
          //   // console.log("error", error);
          //   // message.error("Đăng kí khóa học thất bại");
          // }
        }
      } else {
        message.error("Đăng kí khóa học thất bại");
      }
    } else {
      message.warning(`Khóa học đã được đăng kí`);
    }
  }, [form, paymentMethod, isAlreadyOrdered]);
  useEffect(() => {
    if (profileInfo) {
      setForm({
        name: orderedCourse?.firstName || profileInfo?.firstName,
        email: orderedCourse?.email || profileInfo?.email,
        course: orderedCourse?.id || profileInfo?.id,
        phone: orderedCourse?.phone || profileInfo?.phone,
        type: orderedCourse?.type || typeOptions[0]?.value || "",
        paymentMethod: paymentMethod,
      });
      orderedCourse?.paymentMethod &&
        setPaymentMethod(orderedCourse.paymentMethod);
    }
  }, [profileInfo, typeOptions, orderedCourse, setPaymentMethod]);
  const isPageLoading = useDebounce(courseDetailLoading, 300);
  if (isPageLoading) {
    return (
      <main className="mainwrapper --ptop">
        <Loading />
      </main>
    );
  }
  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <div className="itemorder infoorder">
            <h3 className="title --t3">Thông tin đơn hàng</h3>
            <div className="boxorder">
              <div className="boxorder__col">
                <label className="label">{orderedName || name}</label>
                <div className="boxorder__col-course">
                  <div className="img">
                    <img src={orderedImage || image} alt={slug} />
                  </div>
                  <div className="info">
                    <p className="name">
                      <strong>{orderedName || name}</strong>
                    </p>
                    <p>{teacherInfo?.name}</p>
                  </div>
                </div>
              </div>
              <div className="boxorder__col">
                <label className="label">Tạm tính</label>
                <p>{fomatCurrency(orderedPrice || price)}</p>
              </div>
              <div className="boxorder__col">
                <label className="label">Giảm giá</label>
                <p>0đ</p>
              </div>
              <div className="boxorder__col">
                <label className="label">thành tiền</label>
                <p>
                  <strong>{fomatCurrency(orderedPrice || price)}</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="itemorder formorder">
            <h3 className="title --t3">Thông tin cá nhân</h3>
            <div className="boxorder">
              <div className="form">
                <div className="form-container">
                  <div className="form-group">
                    <Input
                      disabled={isAlreadyOrdered}
                      required
                      label="Họ và tên"
                      placeholder="Nhập họ và tên"
                      type="text"
                      {...register("name")}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      required
                      label="Email"
                      placeholder="Nhập Email"
                      type="text"
                      disabled
                      {...register("email")}
                    />
                  </div>
                </div>
                <div className="form-container">
                  <div className="form-group">
                    <Input
                      disabled={isAlreadyOrdered}
                      required
                      label="Số điện thoại"
                      placeholder="Nhập Số điện thoại"
                      type="text"
                      {...register("phone")}
                    />
                  </div>
                  <div className="form-group">
                    <Select
                      disabled={isAlreadyOrdered}
                      required
                      label="Chủ đề cần hỗ trợ"
                      optionsPageContact={typeOptions}
                      {...register("type")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Radio
            defaultValue={paymentMethod}
            title="Hình thức thanh toán"
            className="itemorder paymentorder"
            onChange={onPaymentChange}
            disabled={isAlreadyOrdered}
          >
            <div className="boxorder">
              <Radio.Option
                description={`Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
                  ngân hàng sẽ được gửi đến email của bạn, bạn vui lòng chuyển
                  khoản với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
                  Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của
                  bạn sau khi giao dịch thành công.`}
                value={`atm`}
                className="boxorder__pay"
              >
                <img src="/img/icon-payment-method-atm.svg" alt="" />
                Thành toán bằng chuyển khoản
                <span className="checkmark" />
              </Radio.Option>
              <Radio.Option
                value={`momo`}
                className="boxorder__pay"
                description={`Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
                  MoMo sẽ được gửi đến email của bạn, bạn vui lòng chuyển khoản
                  với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
                  Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của
                  bạn sau khi giao dịch thành công.`}
              >
                <img src="/img/icon-payment-method-mo-mo.svg" alt="" />
                Thanh toán bằng ví Momo
                <span className="checkmark" />
              </Radio.Option>
              <Radio.Option
                value={`cash`}
                className="boxorder__pay"
                description={` Sau khi bấm đăng ký, thông tin khoá học sẽ được gửi đến email
                  của bạn, bạn vui lòng đến văn phòng CFD Circle vào ngày khai
                  giảng để đóng học phí tại số 11b, Phan Kế Bính, quận 1, TP Hồ
                  Chí Minh.`}
              >
                <img src="/img/icon-payment-method-cod.svg" alt="" />
                Thanh toán bằng tiền mặt
                <span className="checkmark" />
              </Radio.Option>

              {/* Khoá học video và video mentor thì không có thanh toán tiền mặt */}
            </div>
          </Radio>

          {/* addclass --processing khi bấm đăng ký */}
          <Button
            disabled={isAlreadyOrdered}
            onClick={onSubmit}
            style={{ width: "100%" }}
          >
            <span>Đăng ký khoá học</span>
            {/* <svg
              version="1.1"
              id="L9"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enableBackground="new 0 0 0 0"
              xmlSpace="preserve"
            >
              <path
                fill="#fff"
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  dur="1s"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </path>
            </svg> */}
          </Button>
        </div>
      </section>
    </main>
  );
}
