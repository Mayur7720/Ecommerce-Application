import React, { useEffect, useRef } from "react";

function Modal({ isOpen, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);
  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="p-5 w-1/3 min-h-1 shadow-slate drop-shadow-lg rounded-md bg-slate-200   "
    >
      <div className="flex justify-center">{children}</div>
      <button
        className="px-2 py-1 bg-red-500 mx-auto block mt-4 text-white rounded"
        onClick={onClose}
      >
        Close
      </button>
    </dialog>
  );
}

export default Modal;
