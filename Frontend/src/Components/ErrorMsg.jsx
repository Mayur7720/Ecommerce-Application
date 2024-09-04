import React, { useEffect, useState } from "react";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";

function ErrorMsg({ message, color, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
     if (message) {
      setIsVisible(true);
    }
  }, [message]);

  return (
    <div
      className={`flex rounded-md items-center gap-5 ${color} shadow-md shadow-black/30 fixed right-4 top-5 p-4 transform transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <span className="font-mono text-slate-900">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false); // Slide out the alert
          setTimeout(onClose, 300); // Call onClose after the animation
        }}
        className="text-slate-900 hover:text-slate-700"
      >
        <FaTimes />
      </button>
    </div>
  );
}

export default ErrorMsg;
