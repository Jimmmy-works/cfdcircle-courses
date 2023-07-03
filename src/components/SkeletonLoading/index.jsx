import { Empty, Skeleton } from "antd";
import React from "react";

export default function SkeletonLoading({
  isArray = 1,
  isData,
  isLoading,
  isStyled,
  isParagraph = {},
}) {
  return (
    <>
      {!isLoading && isData?.length === 0 && (
        <Empty
          description="Dữ liệu lỗi. Xin vui lòng thử lại"
          style={{ margin: "20px auto", fontSize: 20 }}
        />
      )}
      {isLoading &&
        Array(isArray)
          .fill("")
          .map((_, index) => {
            return (
              <div key={index} className="courses__list-item">
                <Skeleton
                  style={isStyled}
                  active
                  avatar
                  paragraph={isParagraph}
                />
              </div>
            );
          })}
    </>
  );
}
