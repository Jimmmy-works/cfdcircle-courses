import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../constant/pathnames";
import { fomatCurrency } from "../../utils/fomatCurrency";
import CourseItem from "../../components/CourseItem";
import { courseService } from "../../services/courseService";
import { Empty, Input, Skeleton, message } from "antd";
import { useQuery } from "../../hooks/useQuery";
import useDebounce from "../../hooks/useDebounce";
import Search from "antd/es/input/Search";
import SkeletonLoading from "../../components/SkeletonLoading";
import Loading from "../../components/Loading";

export default function Course() {
  const { data, error, loading, refetch } = useQuery(() =>
    courseService.getCoures()
  );
  const dataCourses = data?.courses || [];
  // Serach + reFetch Data
  const [searchTerm, setSearchTerm] = useState();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  useEffect(() => {
    if (typeof debouncedSearchTerm === "string") {
      refetch(debouncedSearchTerm ? `?search=${debouncedSearchTerm}` : "");
    }
  }, [debouncedSearchTerm]);

  const isLoading = useDebounce(loading, 1000);
  if (isLoading) return <Loading />;

  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
            <Search
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              style={{ minWidth: 300, maxWidth: 400 }}
            />
          </div>
        </div>
        <div className="courses__list">
          <SkeletonLoading
            isArray={4}
            isData={dataCourses}
            isLoading={loading}
            isStyled={{ width: 580, height: 640 }}
            isParagraph={{ rows: 14 }}
          />

          {!loading &&
            dataCourses?.length > 0 &&
            dataCourses.map((course, index) => {
              // console.log("course", course);
              return <CourseItem {...course} key={course.id || index} />;
            })}
        </div>
      </div>
    </main>
  );
}
