import React from "react";

function SelectOption({ options, label, name, handleChange }) {
  return (
    <div>
      <label className="font-semibold " htmlFor={name}>
        {label}{" "}
      </label>
      <select
        onChange={(e) => handleChange(e)}
        name={name}
        className="outline-none rounded "
      >
        {options.map((val, idx) => (
          <option key={idx} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectOption;
