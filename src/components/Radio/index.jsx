import React, { useState } from "react";

export default function Radio({
  optionRadio,
  label,
  required,
  value,
  error,
  onChange,
  ...propsRadio
}) {
  const [checkId, setCheckId] = useState(0);

  return (
    <div className="boxorder">
      {optionRadio?.length &&
        optionRadio?.map((radio, index) => {
          return (
            <div
              key={index}
              className={`boxorder__pay `}
              onClick={() => {
                setCheckId(index);
              }}
            >
              <label className="radiocontainer">
                <img src={radio.icon} alt="" />
                {radio.title}
                <input
                  {...propsRadio}
                  value={radio.value}
                  onChange={onChange}
                  className={`select form__input `}
                  type="radio"
                  name="radio"
                />
                <span className="checkmark" />
              </label>
              <div
                style={{ display: checkId === index ? "block" : "" }}
                className="boxorder__pay-tooltip "
              >
                {radio.description}
              </div>
            </div>
          );
        })}
      <p
        style={{
          fontSize: "1.6rem",
          color: "#dc1414",
          marginTop: 0,
          paddingLeft: 28,
        }}
        className="error"
      >
        {error || ""}
      </p>
    </div>
  );
}
