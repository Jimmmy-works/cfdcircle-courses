import React, { createContext, useContext, useEffect, useState } from "react";

const RadioContext = createContext({
  selectedValue: "",
  handleChange: () => {},
});

// Component cha
const Radio = ({ children, defaultValue, onChange, disabled, ...props }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };
  const handleClickToggle = () => {
    setSelectedValue(selectedValue);
  };
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <RadioContext.Provider
      value={{
        selectedValue,
        handleChange,
        handleClickToggle,
      }}
    >
      <>
        <h3 className="title --t3">{props.title}</h3>
        <div style={{ pointerEvents: disabled ? "none" : "auto" }} {...props}>
          {children}
        </div>
      </>
    </RadioContext.Provider>
  );
};
// Component con
const RadioOption = ({ value, children, className, ...propsRadioOption }) => {
  const { selectedValue, handleChange, handleClickToggle } =
    useContext(RadioContext);

  return (
    <>
      <label className={`radiocontainer ${className}`}>
        <input
          type="radio"
          name="radio"
          value={value}
          checked={selectedValue === value}
          onChange={handleChange}
          onClick={handleClickToggle}
        />
        {children}
      </label>
      <div
        style={{ display: selectedValue === value ? "block" : "" }}
        className="boxorder__pay-tooltip"
      >
        {propsRadioOption?.description}
      </div>
    </>
  );
};

Radio.Option = RadioOption;

export default Radio;
