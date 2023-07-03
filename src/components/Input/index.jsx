import React, { forwardRef } from "react";
export const Input = forwardRef(
  (
    {
      label,
      required,
      //   value,
      //   onChange,
      //   type = "text",
      //   error,
      renderProps,
      ...inputProps
    },
    ref
  ) => (
    <>
      <label className="label">
        {label} <span>{required && "*"}</span>
      </label>
      {renderProps ? (
        renderProps(inputProps)
      ) : (
        <>
          <input
            ref={ref}
            // value={value}
            // onChange={onChange}
            // type={type}
            className={`form__input ${!!inputProps.error ? `formerror` : ""}`}
            {...inputProps}
          />
        </>
      )}
      <p className="error">{inputProps.error || ""}</p>
    </>
  )
);
