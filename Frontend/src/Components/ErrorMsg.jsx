import React, { useEffect, useState } from "react";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";

function ErrorMsg({ message, color, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  let timeoutId;

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      timeoutId = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 2000);
    }

    // Clear the timeout when the component unmounts or message changes
    return () => clearTimeout(timeoutId);
  }, [message, onClose]);

  return (
    <div
      className={`z-50 flex rounded-md items-center gap-5 ${color} shadow-md shadow-black/30 fixed right-4 top-5 p-4 transform transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    > 
      <span className="font-mono font-semibold text-lg text-green-800">
        {message}
      </span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="text-slate-900 hover:text-slate-700"
      >
        <FaTimes />
      </button>
    </div>
  );
}

export default ErrorMsg;
