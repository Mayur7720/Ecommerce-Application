import React from "react";
import Progressbar from "./Progressbar";
import { FaStar } from "@react-icons/all-files/fa/FaStar";

function findHigestRating(rate) {
  let maxValue = 0;
  for (let i = 0; i < rate.length; i++) {
    if (maxValue < rate[i].total) {
      maxValue = rate[i].total;
    }
  }
  return maxValue;
}

function Rating() {
  const ratings = [
    { stars: 5, total: 144, id: 13 }, //here should be product id to identify for which product reviews are!
    { stars: 4, total: 30, id: 14 },
    { stars: 3, total: 145, id: 15 },
    { stars: 2, total: 1000, id: 16 },
    { stars: 1, total: 1002382, id: 12 },
  ];
  const HighestRating = findHigestRating(ratings);

  return (
    <>
      {ratings.map((rating) => (
        <div
          key={rating.id}
          className="text-sm flex  items-center gap-1 w-full "
        >
          <span className="text-xs">{rating.stars}</span>
          <span className="">
            <FaStar className="w-2" />
          </span>
          <span>
            <Progressbar
              HighestRating={HighestRating}
              ratingTotal={rating.total}
            />
          </span>
          <span className="text-xs">{rating.total}</span>
        </div>
      ))}
    </>
  );
}

export default Rating;
