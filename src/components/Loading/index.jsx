import { Spin } from "antd";
import React from "react";
import { styled } from "styled-components";
const LoadingSpin = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 10000;
  background-color: #fff;
`;

const Loading = () => {
  return (
    <LoadingSpin className="loading">
      <Spin size="large"></Spin>
    </LoadingSpin>
  );
};

export default Loading;

// const Loading = () => {
//   return <div className="loading"></div>;
// };

// export default Loading;
