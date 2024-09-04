import React from "react";

function Progressbar({ HighestRating, ratingTotal }) {
  let percentage = (HighestRating * ratingTotal) / 100;
  return (
    <div className=" flex overflow-hidden w-32 rounded-full">
      <div className="relative w-full h-1  bg-slate-300">
        <div
          style={{ width: `${percentage}%` }}
          className={`absolute bg-green-600 h-full`}
        ></div>
      </div>
    </div>
  );
}

export default Progressbar;
