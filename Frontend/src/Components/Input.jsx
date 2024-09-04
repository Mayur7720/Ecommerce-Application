import React from "react";

function Input({ label, type, fname, width = "w-full" }) {
  return (
    <div>
      <label htmlFor={fname}>{label}</label>
      <input
        className={`mt-1 ${width} bg-stone-100 outline-none pl-3 mb-4 py-1 rounded ring-1 ring-slate-400 hover:border-transparent  focus:ring-blue-400 hover:ring-1 hover:ring-blue-400`}
        type={type}
        name={fname}
      />
    </div>
  );
}

export default Input;
