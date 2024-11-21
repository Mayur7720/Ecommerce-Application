import React from "react";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import Rating from "./Rating";
import Comments from "./Comments";
import Button from "./Button";
function RatingAndReviews({ singleProduct }) {
  return (
    <article className="border rounded mt-8">
      <div className="flex justify-between items-center">
        <p className="text-xl px-2 font-semibold m-1">Ratings & Reviews</p>
        <Button
          classname="bg-amber-400 px-2 py-2 m-1 mr-2 shadow-md font-semibold"
          label="Rate Product"
        />
      </div>
      <div className="flex justify-evenly mt-3 p-3">
        <p className="flex gap-2 rounded-md justify-center px-1 font-normal text-4xl text-slate-900">
          {singleProduct?.rating?.toString().slice(0, 3)}
          <FaStar className="pt-1 w-8 h-10" />
        </p>
        <div>
          <Rating />
        </div>
      </div>
      <Comments reviews={singleProduct?.reviews} />
    </article>
  );
}

export default RatingAndReviews;
