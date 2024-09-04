import React from "react";

function Button({ label, classname="",...rest }) {
  return (
    <button className={`${classname} `} {...rest}>
      {label}
    </button>
  );
}

export default Button;
