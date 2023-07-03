import React from "react";

export default function Select({
  optionsPageContact,
  label,
  required,
  value,
  error,
  onChange,
  ...propsSelect
}) {
  return (
    <>
      <label className="label">
        {label} <span>{required && "*"}</span>
      </label>
      <select
        {...propsSelect}
        value={value}
        onChange={onChange}
        className={`select form__input  ${!!error ? `formerror` : ""}`}
      >
        {optionsPageContact?.length > 0 &&
          optionsPageContact.map((option, index) => {
            return (
              <option value={option.value} key={option.value || index}>
                {option.label}
              </option>
            );
          })}
      </select>
      <p className="error">{error || ""}</p>
    </>
  );
}
